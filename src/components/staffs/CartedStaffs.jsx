import { FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { MdCheck, MdCheckBoxOutlineBlank, MdClose, MdDelete } from "react-icons/md";
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
import { FaArrowLeftLong, FaCircleDot } from "react-icons/fa6";
import FormButton from "../FormButton";

function CartedStaffs() {
  const location = useLocation();
  const { data } = location?.state || { data: null };
  const isArtisan = data?.type === "artisan";
  const CONMPANY_TAX = Number(data?.service_fee) ?? 0;

  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  console.log(data)
  const [cartItems, setCartItems] = useState(data?.items || []);
  const { config, handleSuccess, addToCart, removeFromCart } = useCart();
  const [conditions, setConditions] = useState(false);
  const [removing, setRemoving] = useState({});
  const [terms, setTerms] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const allSelected = selectedItems.length === cartItems.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const validItems = cartItems.filter(item =>
        isArtisan || Number(item?.domestic_staff?.expected_salary) > 0
      );
      setSelectedItems(validItems);
    } else {
      setSelectedItems([]);
    }
  };


  const handleItemSelect = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const navigateToStaff = (staff) =>
    navigate(`/company/staff/${data.category.name}/${staff.id}`, {
      state: { data: { staff, cartedItems: data.cartItems } },
    });

  const getCartItems = async () => {
    try {
      const res = await client.post("staff-cart/get", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
      });

      const filtered = res?.data?.cart_items?.filter(
        (item) => item.domestic_staff.staff_category === data?.type
      );

      setCartItems(filtered || []);
    } catch {
      onFailure({
        message: "Something went wrong",
        error: "Error retrieving carted items",
      });
    }
  };

  const handleAddToCart = async (item) => {
    await addToCart(getCartItems, item);
  };

  const handleRemoveCart = async (item) => {
    setRemoving((prev) => ({ ...prev, [item.domestic_staff_id]: true }));
    await removeFromCart(getCartItems, item);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  //console.log(cartItems, selectedItems)
  // Pricing logic
const rawSalaryTotal = selectedItems.reduce(
  (total, item) => total + Number(item?.domestic_staff?.expected_salary),
  0
);

const salaryTotal = isArtisan
  ? 0
  : rawSalaryTotal * (1 + Number(data?.domestic_percent || 0) / 100);

const serviceFeeTotal = CONMPANY_TAX * selectedItems.length;
const vatPercent = Number(data?.vat_percent || 0);
const totalBeforeVat = salaryTotal + serviceFeeTotal;
const totalVat = (totalBeforeVat * vatPercent) / 100;

const grandTotal = isArtisan
  ? (serviceFeeTotal + totalVat)
  : (salaryTotal + serviceFeeTotal + totalVat);

  return (
    <>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="w-max flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
      >
        <FaArrowLeftLong className="me-4 text-green-500" />
        Back
      </button>

      <PopUpBox isOpen={conditions}>
        <div className="w-[90%] md:w-[40%] p-5 bg-white text-gray-500 flex flex-col gap-4">
          <MdClose
            size={24}
            className="flex-shrink-0 sticky top-2 text-2xl self-end cursor-pointer"
            onClick={() => setConditions(false)}
          />
          <h1 className="text-center font-bold text-xl text-black">Terms and Conditions</h1>
          <p className="text-sm leading-relaxed h-max max-h-96 overflow-y-auto">
  {isArtisan ? (
    <>
      <p>This agreement stipulates that the Employer may only assign tasks that align with the 
        their job scope. Any additional tasks beyond these responsibilities require mutual 
        defined responsibilities of the Employee’s designated role. Artisans, including 
        Mechanics, Electricians, Plumbers, and other skilled workers, must strictly adhere to 
        consent between the Employer and the Employee.</p>
      <p className="mt-2">Mayrahkee Africa serves solely as a bridge between the Employer and the Employee and, 
        therefore, shall not be held liable for any disputes or dissatisfaction arising from duties 
        assigned within the agreed scope.</p>
      </>
  ) : (
    <>
      <p>This agreement establishes that the Employer may only assign tasks that fall within the 
defined responsibilities of the Employee’s designated role. Domestic staff, including 
Housekeepers, Drivers, and other positions, must perform duties strictly within their job 
scope. Any additional tasks beyond these responsibilities require mutual consent 
between the Employer and the Employee.</p>
      <p className="mt-2">Mayrahkee Africa shall not be held liable for any disputes or dissatisfaction arising from 
duties assigned outside the agreed scope. Any violation of this policy may constitute a 
breach of contract and could lead to legal consequences in accordance with 
applicablelabourlaws.</p>
    </>
  )}
</p>

          <div
            onClick={() => setTerms(!terms)}
            className="text-sm flex justify-center items-center gap-3 cursor-pointer"
          >
            {terms ? (
              <MdCheck size={20} className="text-primaryColor" />
            ) : (
              <MdCheckBoxOutlineBlank size={20} />
            )}
            <span>I accept the terms and conditions</span>
          </div>

          <div className="sticky bottom-0">
          <PaystackConsumer
            {...config(handleSuccess, selectedItems, getCartItems, grandTotal)}
          >
            {({ initializePayment }) => (
              <FormButton
                onClick={() => {
                  if (terms) initializePayment();
                  else {
                    onFailure({
                      message: "Terms and Conditions",
                      error: "Please agree to the terms by checking the box.",
                    });
                  }
                }}
              >
                Checkout
              </FormButton>
            )}
          </PaystackConsumer>
          </div>
        </div>
      </PopUpBox>

      <div className="w-full flex pt-5 flex-col gap-5">
        <div
          id="content"
          className="flex flex-col gap-2 bg-green-100 pr-5 p-2 w-[90%] md:w-fit text-xs md:text-sm"
        >
          <div className="flex justify-between items-center w-full">
            <span className="flex gap-2 items-center text-green-700">
              Here are a list of your carted {isArtisan ? "Skilled Worker(s)" : "staff(s)"}
              <FaExclamationCircle />
            </span>
            <button
              onClick={() => document.getElementById("content").classList.add("hidden")}
              className="group hover:bg-red-500 hover:text-white p-1 text-red-600 text-md flex items-center"
            >
              Close
              <MdClose />
            </button>
          </div>
          <p>
            Here you can <strong>confirm your hire</strong> for any{" "}
            {isArtisan ? "Skilled Worker" : "staff"} of your choice and proceed to
            checkout to finalize.
          </p>
        </div>

        {cartItems.length !== 0 ? (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Section */}
            <div className="w-full min-w-72 md:w-2/3 bg-white p-6">
              <h2 className="text-lg font-bold mb-4">Job Cart</h2>
              <p className="text-sm text-gray-600 mb-4">
                Showing {cartItems.length} {isArtisan ? "Skilled Worker(s)" : "staff(s)"} you added
              </p>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                <label htmlFor="selectAll" className="text-gray-700">
                  Select All <span className="text-gray-500">({cartItems.length})</span>
                </label>
              </div>

              {/* Items */}
              <div className="space-y-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center border-b pb-4">
                    <input
                      type="checkbox"
                      disabled={!isArtisan && Number(item?.domestic_staff?.expected_salary) <= 0}
                      checked={selectedItems.includes(item)}
                      onChange={() => handleItemSelect(item)}
                      className="mr-4"
                    />

                    <div className="flex-grow flex gap-2 items-center">
                      <img
                        src="/placeholder.png"
                        className="h-[80px] w-[80px] bg-gray-300"
                        alt=""
                      />
                      <section className="w-full">
                        <p className="text-xs text-gray-500 uppercase">
                          {item?.domestic_staff?.subcategory}
                        </p>
                        <p className="text-base font-medium capitalize">
                          {`${item?.domestic_staff?.surname} ${item?.domestic_staff?.first_name}`}
                        </p>
                        <p className="text-sm text-gray-700">
                          {isArtisan ? (
                            ""
                          ) : Number(item?.domestic_staff?.expected_salary) > 0 ? (
                            FormatPrice(Number(item.domestic_staff.expected_salary) * (1 + Number(data?.domestic_percent || 0) / 100))
                          ) : (
                            <span className="text-red-500 font-medium">Expected salary not set</span>
                          )}
                        </p>

                      </section>
                      <div className="flex flex-col items-center gap-2">
                        <span
                          className={`text-md ${item.domestic_staff.availability_status === "1"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          <span className="hidden md:block">{item.domestic_staff.availability_status === "1"
                            ? "Available"
                            : "Unavailable"}</span>
                          <span className="block md:hidden"><FaCircleDot /></span>
                        </span>
                        <button
                          disabled={removing[item?.domestic_staff_id]}
                          onClick={() => handleRemoveCart(item)}
                          className="disabled:opacity-60"
                        >
                          {removing[item?.domestic_staff_id] ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <MdDelete className="text-red-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full min-w-[250px] h-fit md:w-1/3 bg-white border border-black p-6 rounded shadow">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <ul className="space-y-2 mb-6">
                {selectedItems.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item?.domestic_staff?.subcategory} -{" "}
                      {item?.domestic_staff?.surname} {item?.domestic_staff?.first_name}
                    </span>
                    <span>
                      {!isArtisan &&
                        FormatPrice(Number(item.domestic_staff.expected_salary) * (1 + Number(data?.domestic_percent || 0) / 100))}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="border-t pt-4">
                <li className="flex justify-between text-sm mb-2">
                  <span>Total Price (Item)</span>
                  <span>{!isArtisan ? FormatPrice(salaryTotal) : "N/A"}</span>
                </li>
                <li className="flex justify-between text-sm mb-2">
                  <span>Service Charge</span>
                  <span>{FormatPrice(serviceFeeTotal)}</span>
                </li>
                <li className="flex justify-between text-sm mb-2">
  <span>VAT ({vatPercent}%)</span>
  <span>{FormatPrice(totalVat)}</span>
</li>
                <li className="flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span>{FormatPrice(grandTotal)}</span>
                </li>
              </ul>
              <button
                disabled={!selectedItems.length}
                onClick={() => setConditions(true)}
                className={`w-full bg-black text-white py-3 rounded-full mt-6 ${selectedItems.length ? "" : "opacity-50 cursor-not-allowed"
                  }`}
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <h2 className="text-lg font-bold mb-4">Cart Empty</h2>
        )}

        {/* Marketplace */}
        <MarketPlace
          data={data}
          handleAddToCart={handleAddToCart}
          handleRemoveCart={handleRemoveCart}
          cartItems={cartItems}
        />
      </div>
    </>
  );
}

export default CartedStaffs;
