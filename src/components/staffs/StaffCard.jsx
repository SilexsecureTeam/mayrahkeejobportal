import { useContext, useState } from "react";
import FormButton from "../FormButton";
import PopUpBox from "../PopUpBox";
import { useForm } from "react-hook-form";
import { MdCheck, MdClose } from "react-icons/md";
import { AuthContext } from "../../context/AuthContex";
import { axiosClient } from "../../services/axios-client";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import { onFailure } from "../../utils/notifications/OnFailure";
import { PaystackConsumer } from "react-paystack";

const PUBLIC_KEY = import.meta.env.VITE_TEST_PUBLIC_KEY;

function StaffCard({
  data,
  onClick,
  contract = null,
  cartItems,
  setCartItems,
  getCartItems,
}) {
  const { register, handleSubmit } = useForm();
  const { authDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cartloading, setCartLoading] = useState(false);
  const client = axiosClient(authDetails?.token);

  const [open, setOpen] = useState(false);

  const toogleOpen = () => setOpen(!open);

  const handleContract = async (dataToSubmit) => {
    setLoading(true);
    try {
      const response = await client.post("/contracts/create", {
        ...dataToSubmit,
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data.domestic_staff_id,
      });
      const { dataTwo } = await client.post("/staff-cart/remove", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data.domestic_staff_id,
      });
      contract();
      onSuccess({
        message: "Contract successful",
        success: "The Contract has been created",
      });
      toogleOpen();
    } catch (error) {
      console.log(error);
      onFailure({
        message: "Contract unsuccessful",
        error: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    setCartLoading(true);
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
      await getCartItems();
    } catch (error) {
      onFailure({
        message: "Collection Failed",
        error: "Failed to add to collection",
      });
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async () => {
    setCartLoading(true);
    try {
      const response = await client.post("/staff-cart/remove", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data.id,
      });
      onSuccess({
        message: "User sucessfully added",
        success: "Domestic staff added to cart successfully",
      });
      await getCartItems();
    } catch (error) {
      onFailure({
        message: "Cart Failed",
        error: "Failed to remove staff from cart",
      });
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  const config = (handleSuccess) => {
    const priceInKobo = Number(1000) * 100;
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
      onSuccess: (reference) => handleSuccess(reference, data),
      onClose: onClose,
    };
  };

  const handleSuccess = async (reference) => {
    console.log(reference);
    setCartLoading(true);
    try {
      const response = await client.post("/staff-cart/checkout", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
        domestic_staff_id: data.domestic_staff_id,
        reference: reference.reference,
      });
      onSuccess({
        message: "User sucessfully added",
        success: "Domestic staff added to cart successfully",
      });
      await getCartItems();
    } catch (error) {
      onFailure({
        message: "Collection Failed",
        error: "Failed to add to collection",
      });
    } finally {
      setCartLoading(false);
    }
  };

  const getField = (name) => {
    if (data?.domestic_staff) {
      return data?.domestic_staff[name];
    } else {
      return data[name];
    }
  };

  return (
    <>
      <PopUpBox isOpen={open}>
        <div className="w-[30%] p-3 gap-3 rounded-lg  flex flex-col bg-white">
          <MdClose
            onClick={toogleOpen}
            type="date"
            className="place-self-end text-lg cursor-pointer"
          />
          <label className="text-sm font-semibold">Contract Start Date</label>
          <input
            type="date"
            {...register("start_date")}
            className="p-2 border focus:outline-none"
            placeholder="Enter language..."
          />
          <label className="text-sm mt-5 font-semibold">
            Contract Start Date
          </label>
          <input
            type="date"
            {...register("end_date")}
            className="p-2 border focus:outline-none"
            placeholder="Enter language..."
          />

          <FormButton
            loading={loading}
            onClick={handleSubmit((data) => {
              console.log(data);
              handleContract(data);
            })}
          >
            Proceed
          </FormButton>
        </div>
      </PopUpBox>
      <div className="min-h-fit flex gap-1 flex-col justify-between p-2 border min-w-fit">
        <div className="flex flex-col  gap-2">
          <span className="flex items-center gap-2 text-md font-semibold">
            Name:
            <span className="text-sm font-normal text-gray-500">
              {getField('first_name')} {getField('surname')}
            </span>
          </span>

          <span className="flex gap-2 items-center text-md font-semibold">
            Age Range:
            <span className="text-sm font-normal text-gray-500">
              {getField('age')} Years
            </span>
          </span>

          <span className="flex gap-2 items-center text-md font-semibold">
            Category:
            <span className="text-sm font-normal text-gray-500">
              {getField('subcategory')}
            </span>
          </span>

          <span className="flex gap-2 items-center text-md truncate font-semibold">
            Education:
            <span className="text-sm font-normal text-gray-500">
              {getField('education_level')}
            </span>
          </span>
        </div>

        {!contract && (
          <div className="w-full flex flex-col-reverse gap-2">
            {cartItems.find(
              (current) => data.id === current.domestic_staff_id
            ) ? (
              <div className="flex  flex-col gap-2 items-center">
                <p className="flex items-center gap-2 p-2 text-md text-primaryColor">
                  {" "}
                  <MdCheck /> Aready in Cart
                </p>
                <FormButton
                  loading={cartloading}
                  onClick={removeFromCart}
                  height="h-fit bg-red-500 text-sm p-1"
                >
                  Remove from cart
                </FormButton>
              </div>
            ) : (
              <FormButton
                loading={cartloading}
                onClick={addToCart}
                height="h-fit text-sm p-1"
              >
                Add to Cart
              </FormButton>
            )}
          </div>
        )}
        {contract && (
          <PaystackConsumer {...config(handleSuccess)}>
            {({ initializePayment }) => (
              <FormButton
                loading={cartloading}
                height="h-fit text-sm p-1"
                onClick={initializePayment}
              >
                Sign
              </FormButton>
            )}
          </PaystackConsumer>
        )}
      </div>
    </>
  );
}

export default StaffCard;
