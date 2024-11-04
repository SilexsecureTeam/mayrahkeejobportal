import { useContext, useEffect, useState } from "react";
import StaffLists from "../../../components/staffs/StaffLists";
import ComingSoon from "../../components/ComingSoon";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { MdClose } from "react-icons/md";
import SearchComponent from "../../../components/staffs/SearchComponent";
import { FaExclamationCircle } from "react-icons/fa";
import StaffCard from "../../../components/staffs/StaffCard";

function DomesticStaff() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [domesticStaffs, setDomesticStaffs] = useState();
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [searchResult, setSearcResult] = useState([]);

  const handleQuerySubmit = async (queryParams) => {
    try {
      if(!queryParams) throw new Error('No Query option selected');
      const { data } = await client.get(
        `/domesticStaff/get-staff?staff_category=staff&${queryParams}`
      );
      console.log(data);
      setSearcResult(data.domesticStaff);
    } catch (error) {
      onFailure({
        message: "Artisan Error",
        error: "Failed to retrieve items/query is empty",
      });
      setSearcResult([]);
    } finally {
      setLoading(false);
    }
  };

  const navigateToStaff = (data) =>
    navigate(`/company/staff/${categories.name}/${data.id}`, {
      state: { data: { staff: data, cartedItems: cartItems } },
    });

  
  const staffsToDisplay =
    searchResult.length > 0
      ? searchResult?.filter(
          (current) =>
            current?.staff_category === "staff" && current?.middle_name !== null
        )
      : [];

  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      try {
        const { data } = await client.get("/staff-categories/2");
        setCategories(data.data);
      } catch (error) {
        onFailure({
          message: "Staff Error",
          error: "Failed to retrieve subcategories",
        });
      } finally {
        setLoading(false);
      }
    };


    initData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col px-12 py-2 gap-[15px]">
      <div className="flex flex-col gap-2 bg-green-100 pr-5 p-2 w-fit">
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
          Here you can search for any artisan of your choice. Fill in the query
          parameters to begin your search
        </p>
      </div>

      <SearchComponent subCategories={categories.subcategories} handleQuerySubmit={handleQuerySubmit} />

      {staffsToDisplay.length > 0 && (
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
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DomesticStaff;
