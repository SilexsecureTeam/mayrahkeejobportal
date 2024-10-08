import { useContext, useEffect, useState } from "react";
import StaffLists from "../../../components/staffs/StaffLists";
import ComingSoon from "../../components/ComingSoon";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { MdClose } from "react-icons/md";
import SearchComponent from "../../../components/staffs/SearchComponent";
import { FaExclamationCircle } from "react-icons/fa";

function DomesticStaff() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [domesticStaffs, setDomesticStaffs] = useState();
  const [loading, setLoading] = useState();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      try {
        const { data } = await client.get("/staff-categories/2");
        setSubCategories(data.data.subcategories);
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

      <SearchComponent subCategories={subCategories} />

      {/* {domesticStaffs && !loading  ? <StaffLists data={domesticStaffs}/> :
       !domesticStaffs && loading ? <span>Getting data</span> :
       <span>
        Failed to fecth data
       </span>
      } */}
    </div>
  );
}

export default DomesticStaff;
