import { useContext, useEffect, useState } from "react";
import StaffLists from "../../../components/staffs/StaffLists";
import ComingSoon from "../../components/ComingSoon";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onFailure } from "../../../utils/notifications/OnFailure";

function Artisan() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [artisans, setArtisans] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      try {
        const { data } = await client.get(
          "/domesticStaff/staff-type?staff_category=Artisan"
        );
        setArtisans(data.domesticStaff);
      } catch (error) {
        onFailure({
          message: "Artisan Error",
          error: "Failed to retrieve artisan data",
        });
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col px-12 py-2 gap-[15px]">
      {artisans && !loading  ? <StaffLists data={artisans}/> :
       !artisans && loading ? <span>Getting data</span> :
       <span>
        Failed to fecth data
       </span>
      }
    </div>
  );
}

export default Artisan;
