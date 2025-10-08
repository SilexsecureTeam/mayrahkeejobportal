import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formmaters";
import { useState } from "react";

function useCart() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const navigateToApplicantDetails = () =>
    navigate(`/company/applicants/detail/${data.id}`, { state: { data } });

  const config = (handleSuccess, data, getCartItems, total) => {
    const priceInKobo = total * 100;
    const onClose = () => {
      onFailure({
        message: "Payment Cancelled",
        error:
          "You closed the payment window before completing the transaction.",
      });
    };
    const onSuccess = async (reference) => {
      setPaymentLoading(true); // START loading
      await handleSuccess(reference, data, getCartItems);
      setPaymentLoading(false); // STOP loading
    };

    return {
      reference: new Date().getTime().toString(),
      email: authDetails?.user?.email,
      amount: priceInKobo,
      publicKey: import.meta.env.VITE_TEST_PUBLIC_KEY,
      text: "Paystack Button Implementation",
      onSuccess: onSuccess,
      onClose: onClose,
    };
  };

  const handleSuccess = async (reference, data, getCartItems) => {
    console.log(data);

    try {
      const response = await client.post("/staff-cart/checkout", {
        //amount: Number(datum.totalAmount), // Convert to kobo
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data.map((item) => item.domestic_staff_id),
        reference: reference.reference,
      });
      const role =
        authDetails.user.role === "employer" ? "company" : "applicant";
      await getCartItems();
      navigate(`/${role}/staff/success`, { state: { data } });
      onSuccess({
        message: "User sucessfully added",
        success: `${data[0]?.domestic_staff?.staff_category} added to contract successfully`,
      });
    } catch (error) {
      onFailure({
        message: "Collection Failed",
        error: extractErrorMessage(error),
      });
    }
  };

  const addToCart = async (getCartItems, data) => {
    try {
      const response = await client.post("/staff-cart/add", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data.id,
      });

      onSuccess({
        message: `Successfully Added`,
        success: extractErrorMessage(response?.data),
      });

      await getCartItems();
    } catch (error) {
      onFailure({
        message: "Collection Failed",
        error: extractErrorMessage(error),
      });
    }
  };

  const removeFromCart = async (getCartItems, data) => {
    try {
      const response = await client.post("/staff-cart/remove", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data?.domestic_staff_id,
      });
      onSuccess({
        message: `Successfully Removed`,
        success: extractErrorMessage(response?.data),
      });
      await getCartItems();
    } catch (error) {
      onFailure({
        message: "Cart Removal Failed",
        error: extractErrorMessage(error),
      });
    }
  };

  return { config, handleSuccess, addToCart, removeFromCart, paymentLoading };
}

export default useCart;
