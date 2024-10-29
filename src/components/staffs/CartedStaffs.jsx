import { FaExclamationCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import StaffCard from "./StaffCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { axiosClient } from "../../services/axios-client";
import { onFailure } from "../../utils/notifications/OnFailure";

function CartedStaffs() {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [cartItems, setCartItems] = useState(data?.items || []);


  // cart ui logic
  const [selectedItems, setSelectedItems] = useState([]);
  const allSelected = selectedItems.length === cartItems.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all items
      setSelectedItems(cartItems);
    } else {
      // Deselect all items
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  //cart ui logic ended
  const navigateToStaff = (staff) =>
    navigate(`/company/staff/${data.category.name}/${staff.id}`, {
      state: { data: { staff: staff, cartedItems: data.cartItems } },
    });

  const getCartItems = async () => {
    try {
      const { data } = await client.post("staff-cart/get", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
      });
      console.log(data.cart_items)
      setCartItems(data.cart_items);
      // setCartItems(
      //   data.cart_items.filter(
      //     (current) =>
      //       current.domestic_staff.staff_category === location.state.data.type
      //   )
      // );

    } catch (error) {
      onFailure({
        message: "soemthing went wrong",
        error: "Error retriving carted items",
      });
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="w-full  px-12 flex  pt-5 flex-col gap-5">
      <div className="flex flex-col gap-2 bg-green-100 pr-5 p-2 w-fit">
        <div className="flex w-full justify-between items-center">
          <span className="flex gap-2 items-center text-green-700">
            Here are a list of your carted staffs
            <FaExclamationCircle />
          </span>

          <button className=" group hover:bg-red-500 hover:text-white p-1 text-red-600 text-md flex justify-between items-center ">
            Close
            <MdClose className="" />
          </button>
        </div>

        <p>
          Here you can sign a contract with any artisan of your choice. Click on
          sign to sign them or view to view thier details
        </p>
      </div>

      {/* Shopping Cart */}
      <div className="flex flex-col md:flex-row gap-8">

        <div className="w-full min-w-72 md:w-2/3 bg-white p-6">
          <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
          <p className="text-sm text-gray-600 mb-4">Showing {cartItems.length} staffs you added</p>

          <div className="mb-4">
            <input type="checkbox" id="selectAll" checked={allSelected} onChange={handleSelectAll} className="mr-2" />
            <label htmlFor="selectAll" className="text-gray-700">
              Select All <span className="text-gray-500">({cartItems.length})</span>
            </label>
          </div>

          {/* Cart Items */}
          <div className="space-y-6">
            {cartItems?.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b pb-4 border-gray-200"
              >
                <input checked={selectedItems.includes(item)}
                  onChange={() => handleItemSelect(item)}
                  type="checkbox" className="mr-4" />
                <div className="flex-grow flex gap-2 items-center">
                  <img
                    src={`/placeholder.png`}
                    className="h-[80px] bg-gray-300 place-self-center w-[80px]"
                    alt=""
                  />
                  <section>
                    <p className="text-xs uppercase text-gray-500">{item?.domestic_staff?.subcategory}</p>
                    <p className="text-base font-medium capitalize">
                      {`${item?.domestic_staff?.surname} ${item?.domestic_staff?.first_name} ${item?.domestic_staff?.middle_name}` || 'Python Programming - From Basics to Advanced Level'}
                    </p>
                    <p className="text-sm text-gray-700">${item?.amount}</p>

                  </section>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full min-w-[250px] h-fit md:w-1/3 bg-white border border-black p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <ul className="space-y-2 mb-6">
            {cartItems?.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="capitalize">
                  {`${item?.domestic_staff?.subcategory} - ${item?.domestic_staff?.surname} ${item?.domestic_staff?.first_name}` || 'Python Programming - From Basics to Advanced Level'}
                </span>
                <span>${item?.amount}</span>

              </li>
            ))}
          </ul>
          <ul className="border-t pt-4">
            <li className="flex justify-between text-sm mb-2">
              <span>Total Price (Item)</span>
              <span>${cartItems.reduce((acc, cart) => acc + parseFloat(cart.amount), 0)}</span>
            </li>
            <li className="flex justify-between text-sm mb-2">
              <span>Shipping Tax & Fee</span>
              <span>$10</span>
            </li>
            <li className="flex justify-between font-bold text-lg">
              <span>Grand Total</span>
              <span>${cartItems.reduce((acc, cart) => acc + parseFloat(cart.amount), 0) + 10}</span>
            </li>
          </ul>
          <button className="w-full bg-black font-semibold text-white py-3 rounded-full mt-6">
            Checkout
          </button>
        </div>
      </div>

      {cartItems && cartItems.length > 0 && (
        <div className="flex flex-col gap-3 mt-5 w-full">
          <ul className="w-full grid grid-cols-responsive gap-4">
            {cartItems.map((current) => (
              <StaffCard
                key={current?.id}
                data={current}
                onClick={navigateToStaff}
                contract={getCartItems}
                setCartItems={setCartItems}
                cartItems={cartItems}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CartedStaffs;
