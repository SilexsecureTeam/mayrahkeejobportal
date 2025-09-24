import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { extractErrorMessage } from "../utils/formmaters";

function useCart() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const navigate = useNavigate();

  const navigateToApplicantDetails = () =>
    navigate(`/company/applicants/detail/${data.id}`, { state: { data } });

  const config = (handleSuccess, data, getCartItems, total) => {
    const priceInKobo = total * 100;
    const onClose = () => {
      onFailure({
        message: "Payment Sucessful",
        error: "Hang on, validating payment...",
      });
    };

    return {
      reference: new Date().getTime().toString(),
      email: authDetails?.user?.email,
      amount: priceInKobo,
      publicKey: import.meta.env.VITE_TEST_PUBLIC_KEY,
      text: "Paystack Button Implementation",
      onSuccess: (reference) => handleSuccess(reference, data, getCartItems),
      onClose: onClose,
    };
  };

  const handleSuccess = async (reference, data, getCartItems) => {
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
        success: "Domestic staff added to contract successfully",
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
        message: `${
          data?.staff_category === "artisan"
            ? "Skilled Worker"
            : data?.staff_category || "User"
        } successfully added`,
        success: `${
          data?.staff_category === "artisan"
            ? "Skilled Worker"
            : data?.staff_category || "User"
        } added to cart successfully.`,
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
        message: `${
          data?.domestic_staff?.staff_category === "artisan"
            ? "Skilled Worker"
            : data?.domestic_staff?.staff_category || "User"
        } successfully Removed`,
        success: `${
          data?.domestic_staff?.staff_category === "artisan"
            ? "Skilled Worker"
            : data?.domestic_staff?.staff_category || "User"
        } removed from cart successfully.`,
      });
      await getCartItems();
    } catch (error) {
      onFailure({
        message: "Cart Removal Failed",
        error: extractErrorMessage(error),
      });
    }
  };

  return { config, handleSuccess, addToCart, removeFromCart };
}

export default useCart;
