import { useContext, useEffect, useState } from "react";
import StaffLists from "../../../components/staffs/StaffLists";
import ComingSoon from "../../components/ComingSoon";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";
import SearchComponent from "../../../components/staffs/SearchComponent";
import { FaExclamationCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import StaffCard from "../../../components/staffs/StaffCard";
import { useNavigate } from "react-router-dom";
import PopUpBox from "../../../components/PopUpBox";
import FormButton from "../../../components/FormButton";

function Artisan() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [searchResult, setSearcResult] = useState([]);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [conditions, setConditions] = useState(false);
  const [queryParams, setQueryParams] = useState();

  const handleQuerySubmit = async (directParams) => {
    setLoading(true);
    try {
      if (!queryParams && !directParams) throw new Error("No Query option selected");

      const dataToPost = (directParams && typeof directParams !== 'undefined') ? directParams : queryParams
      const { data } = await client.get(
        `/domesticStaff/get-staff?staff_category=artisan&${dataToPost}`
      );
      console.log(data);
      setSearcResult(data.domesticStaff);
    } catch (error) {
      console.log(error)
      onFailure({
        message: "Artisan Error",
        error: "Failed to retrieve items/query is empty",
      });
      setSearcResult([]);
    } finally {
      setLoading(false);
      setConditions(false)
    }
  };


  const handleCondition = (data, hasCategory) => {
    if(hasCategory){
      console.log('Data', data)
      setConditions(true)
      setQueryParams(data)
    } else{
      handleQuerySubmit(data)
    }
  }

  const navigateToStaff = (data) =>
    navigate(`/company/staff/${categories.name}/${data.id}`, {
      state: { data: { staff: data, cartedItems: cartItems } },
    });

  const navigateToCart = () =>
    navigate(`/company/staff/cart`, {
      state: { data: { items: cartItems, category: categories, type: 'artisan' } },
    });

  const staffsToDisplay =
    searchResult.length > 0
      ? searchResult?.filter(
          (current) =>
            current?.staff_category === "artisan" && current?.middle_name !== null
        )
      : [];

  const getCartItems = async () => {
    try {
      const { data } = await client.post("staff-cart/get", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
      });
      if (data.cart_items) {
        setCartItems(
          data.cart_items.filter(
            (current) => current.domestic_staff.staff_category === "artisan"
          )
        );
      }
    } catch (error) {
      onFailure({
        message: "soemthing went wrong",
        error: "Error retriving carted items",
      });
    }
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      try {
        const { data } = await client.get("/staff-categories/1");
        const response = await client.get("/staff-categories/1");
        setCategories(data.data);
      } catch (error) {
        onFailure({
          message: "Artisan Error",
          error: "Failed to retrieve subcategories",
        });
      } finally {
        setLoading(false);
      }
    };

    initData();
    getCartItems();
  }, []);

  return (
    <>
      <PopUpBox isOpen={conditions}>
        <div className="w-[90%] md:w-[40%] md:h-fit text-gray-500 p-5 items-center flex flex-col gap-4 bg-white">
      
          <MdClose
            className="text-2xl place-self-end cursor-pointer"
            onClick={() => setConditions(!conditions)}
          />
          <h1>Terms for compliance</h1>
          <p className="text-sm">
            This agreement acknowledges that the employer may only assign tasks
            that are directly related to the designated role of the employee.
            Artisan must only perform duties as outlined within the scope of
            their specific role, whether as a housekeeper, driver, or other
            position. Any tasks outside these roles require mutual agreement
            between the employer and the employee. Violation of this policy may
            result in a breach of contract or legal consequences, depending on
            applicable labor laws.
          </p>
          <FormButton onClick={() => handleQuerySubmit()} loading={loading}>Confirm and Search</FormButton>
        </div>
      </PopUpBox>
   <div className="h-full w-full flex flex-col px-5 md:px-8 lg:px-12 py-2 gap-[15px]">
        <div className="flex w-full justify-between items-center gap-1">
          <div className="flex flex-col gap-2 bg-green-100 pr-5 p-2 w-[90%] md:w-fit text-xs md:text-sm">
            <div className="flex w-full justify-between items-center">
              <span className="flex gap-2 items-center text-green-700">
                Welcome to our artisan hub <FaExclamationCircle />
              </span>

              <button className=" group hover:bg-red-500 hover:text-white p-1 text-red-600 text-md flex justify-between items-center ">
                Close
                <MdClose className="" />
              </button>
            </div>

            <p>
              Here you can search for any artisan of your choice. Fill in the
              query parameters to begin your search
            </p>
          </div>

          <button
            onClick={navigateToCart}
            className="border p-2 h-fit border-primaryColor text-sm hover:bg-primaryColor hover:text-white"
          >
            View Carted Staffs
          </button>
        </div>

        <SearchComponent
          subCategories={categories.subcategories}
          handleQuerySubmit={handleCondition}
        />

        {staffsToDisplay.length > 0 ? (
          <div className="flex flex-col gap-3 mt-5">
            <span className="font-semibold text-yellow-600">
              Showing Search You Result
            </span>
            <ul className="w-full grid grid-cols-3 gap-2">
              {staffsToDisplay?.map((current) => (
                <StaffCard
                  key={current?.id}
                  data={current}
                  onClick={navigateToStaff}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  getCartItems={getCartItems}
                />
              ))}
            </ul>
          </div>
        ) : <span className="text-md text-red-600 text-center">No Result from this search query</span>}
      </div>
    </>
  );
}

export default Artisan;
