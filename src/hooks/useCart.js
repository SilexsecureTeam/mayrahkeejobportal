import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
const PUBLIC_KEY = import.meta.env.VITE_TEST_PUBLIC_KEY;

function useCart() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const navigate = useNavigate();

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
      publicKey: PUBLIC_KEY,
      text: "Paystack Button Implementation",
      onSuccess: (reference) => handleSuccess(reference, data, getCartItems),
      onClose: onClose,
    };
  };

  const handleSuccess = async (reference, data, getCartItems) => {
    try {
      const response = data.map(async (datum) => {
        await client.post("/staff-cart/checkout", {
          user_id: authDetails.user.id,
          user_type: authDetails.user.role,
          domestic_staff_id: datum.domestic_staff_id,
          reference: reference.reference,
        });
      });

      await Promise.all(response);
      await getCartItems();
      onSuccess({
        message: "User sucessfully added",
        success: "Domestic staff added to cart successfully",
      });

      //   navigate(`/company/staff/staff/${data.id}`, {
      //     state: { data: { staff: data, cartedItems: cartItems } },
      //   });
    } catch (error) {
      onFailure({
        message: "Collection Failed",
        error: "Failed to add to collection",
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
        message: "User sucessfully added",
        success: "Domestic staff added to cart successfully",
      });
      await getCartItems()
    } catch (error) {
      onFailure({
        message: "Collection Failed",
        error: "Failed to add to collection",
      });
      console.log(error);
    } 

  };

  const removeFromCart = async (getCartItems, data) => {
    try {
      const response = await client.post("/staff-cart/remove", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data.domestice_staff_id,
      });
      onSuccess({
        message: "User sucessfully added",
        success: "Domestic staff added to cart successfully",
      });
      await getCartItems()
    } catch (error) {
      onFailure({
        message: "Cart Failed",
        error: "Failed to remove staff from cart",
      });
    }
  };

  return { config, handleSuccess, addToCart, removeFromCart };
}

export default useCart;
