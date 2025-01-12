import { FaExclamationCircle } from "react-icons/fa";
import { MdCheck, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import StaffCard from "./StaffCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { axiosClient } from "../../services/axios-client";
import { onFailure } from "../../utils/notifications/OnFailure";
import { FormatPrice } from "../../utils/formmaters";
import { PaystackConsumer } from "react-paystack";
import useCart from "../../hooks/useCart";
import MarketPlace from "./marketplace/MarketPlace";
import PopUpBox from "../PopUpBox";
import FormButton from "../FormButton";

function CartedStaffs() {
  const location = useLocation();
  const { data } = location?.state || { data: null };
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);

  const [cartItems, setCartItems] = useState(data?.items || []);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [terms, setTerms] = useState(false);

  const { config, handleSuccess, addToCart, removeFromCart } = useCart();

  const allSelected = selectedItems.length === cartItems.length;

  const getCartItems = async () => {
    try {
      setLoading(true);
      const { data } = await client.post("staff-cart/get", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
      });
      setCartItems(data.cart_items || []);
    } catch (error) {
      onFailure({
        message: "Something went wrong",
        error: "Error retrieving carted items",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? cartItems : []);
  };

  const handleItemSelect = (item) => {
    if (item.domestic_staff.availability_status !== "1") {
      return onFailure({
        message: "Availability Status",
        error: "Only available staff can be checked out.",
      });
    }

    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const calculateTotal = (pricePerItem, tax) =>
    selectedItems.length * pricePerItem + tax;

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <PopUpBox isOpen={conditions}>
        <div className="w-[90%] md:w-[40%] p-5 bg-white text-gray-500 flex flex-col gap-4">
          <MdClose
            className="text-2xl cursor-pointer place-self-end"
            onClick={() => setConditions(!conditions)}
          />
          <h1>Terms and Conditions</h1>
          <p className="text-sm">
            This agreement acknowledges that the employer may only assign tasks
            directly related to the designated role of the employee...
          </p>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setTerms(!terms)}
          >
            {terms ? (
              <MdCheck size={20} className="text-primaryColor" />
            ) : (
              <MdCheckBoxOutlineBlank size={20} />
            )}
            <span>I accept the terms and conditions</span>
          </div>
          <PaystackConsumer
            {...config(
              handleSuccess,
              selectedItems,
              getCartItems,
              calculateTotal(2000, 100)
            )}
          >
            {({ initializePayment }) => (
              <FormButton
                onClick={() => {
                  if (terms) {
                    initializePayment();
                  } else {
                    onFailure({
                      message: "Terms and Conditions",
                      error: "Please agree to the terms to proceed.",
                    });
                  }
                }}
              >
                Checkout
              </FormButton>
            )}
          </PaystackConsumer>
        </div>
      </PopUpBox>

      <div className="w-full px-5 md:px-8 lg:px-12 pt-5 flex flex-col gap-5">
        {loading ? (
          <p>Loading cart items...</p>
        ) : cartItems.length ? (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Shopping Cart */}
            <div className="w-full md:w-2/3 bg-white p-6">
              <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                <label htmlFor="selectAll">Select All</label>
              </div>
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b pb-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleItemSelect(item)}
                      className="mr-4"
                    />
                    <div className="flex-grow flex gap-2 items-center">
                      <img
                        src={item.domestic_staff.photo || "/placeholder.png"}
                        alt="Staff"
                        className="h-20 w-20 bg-gray-300"
                      />
                      <section>
                        <p className="uppercase text-gray-500 text-xs">
                          {item.domestic_staff.subcategory}
                        </p>
                        <p className="text-base font-medium">
                          {`${item.domestic_staff.surname} ${item.domestic_staff.first_name}`}
                        </p>
                        <p className="text-sm">{FormatPrice(2000)}</p>
                      </section>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full md:w-1/3 bg-white border p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <ul className="mb-6">
                {selectedItems.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>{item.domestic_staff.subcategory}</span>
                    <span>{FormatPrice(2000)}</span>
                  </li>
                ))}
              </ul>
              <ul className="border-t pt-4">
                <li className="flex justify-between text-sm">
                  <span>Total Price</span>
                  <span>{FormatPrice(2000 * selectedItems.length)}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Tax Fee</span>
                  <span>{FormatPrice(100)}</span>
                </li>
                <li className="flex justify-between font-bold">
                  <span>Grand Total</span>
                  <span>{FormatPrice(calculateTotal(2000, 100))}</span>
                </li>
              </ul>
              <button
                disabled={!selectedItems.length}
                onClick={() => setConditions(true)}
                className={`w-full py-3 rounded ${
                  selectedItems.length ? "bg-black text-white" : "bg-gray-300"
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p>No items in your cart.</p>
        )}
        <MarketPlace handleAddToCart={addToCart} />
      </div>
    </>
  );
}

export default CartedStaffs;
