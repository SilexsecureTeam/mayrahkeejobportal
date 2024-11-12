import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";



function useStaffUser() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);

  //availabilit status => 1 for available, 0 for not
  const updateAvailabilityStatus = async (staffId, status) => {

    try {
      const result = await client.post(
        `/domesticStaff/update-profile/${staffId}`,
        { availability_status: status }
      );
      await getStaffProfile();
      return true;
    } catch (error) {
      onFailure({
        message: "Error",
        error: "Could not update your status",
      });
      return false;
    }
  };

  return {
    updateAvailabilityStatus,
  };
}

export default useStaffUser;
