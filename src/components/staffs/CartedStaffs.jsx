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
  const {data} = location.state
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [cartItems, setCartItems] = useState([]);

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
      setCartItems(data.cart_items);
    } catch (error) {
      onFailure({
        message: "soemthing went wrong",
        error: "Error retriving carted items",
      });
    }
  };

  console.log(cartItems)
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

      {cartItems.length > 0 && (
        <div className="flex flex-col gap-3 mt-5 w-full">
          
          <ul className="w-full grid grid-cols-3 gap-2">
            {cartItems.map((current) => (
              <StaffCard
                key={current?.id}
                data={current}
                onClick={navigateToStaff}
                contract={true}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CartedStaffs;
