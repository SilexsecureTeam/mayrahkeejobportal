import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { FormatError } from "../utils/formmaters";
import { StaffManagementContext } from "../context/StaffManagementModule";

function useStaff() {
  const ContractStatus = {
    accept: "Accept",
    reject: "Reject",
  };
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const navigate = useNavigate();

  //To get Garantor's Details
  const getGarantorDetails = async (staffId) => {
    try {
      const { data } = await client.get(`/domesticStaff/guarantor/${staffId}`);

      if (data.guarantor) {
        return data.guarantor;
      }
      return [];
    } catch (error) {
      onFailure({
        message: "Garantor Error",
        failure: "Error Retrieving garantor details",
      });

      return [];
    }
  };

  //To get  Medical History
  const getMedicalDetails = async (staffId) => {
    try {
      const { data } = await client.get(
        `/domesticStaff/medical-history/${staffId}`
      );

      if (data.MedicalHistory) {
        return data.MedicalHistory;
      }
      return [];
    } catch (error) {
      onFailure({
        message: "Garantor Error",
        failure: "Error Retrieving garantor details",
      });

      return [];
    }
  };

  //To get Police Records
  const getPoliceDetails = async (staffId) => {
    try {
      const { data } = await client.get(
        `/domesticStaff/police-report/${staffId}`
      );

      if (data.PoliceReport) {
        return data.PoliceReport;
      }
      return [];
    } catch (error) {
      onFailure({
        message: "Garantor Error",
        failure: "Error Retrieving garantor details",
      });

      return [];
    }
  };

  //To get Work Experience
  const getWorkExperience = async (staffId) => {
    try {
      const { data } = await client.get(
        `/domesticStaff/previous-work-experience/${staffId}`
      );

      if (data.PreviousWorkExperience) {
        return data.PreviousWorkExperience;
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  //To get Work Experience
  const updateContractStatus = async (staff, status, setStaff) => {
    try {
      const { data } = await client.post(
        `/domesticStaff/update-profile/${staff.id}`,
        {
          contract_status: status === ContractStatus.accept ? '1' : '2',
        }
      );
      setStaff(data.data)
    if(ContractStatus.accept === status){
      onSuccess({
        message: 'Contract Status',
        success: 'You have completed this a contract'
      })
    } else{
      onSuccess({
        message: 'Contract Status',
        success: 'You have rejected this staff'
      })
    }
      return true;
    } catch (error) {
      return false;
    }
  };

  //availabilit status => 1 for available, 0 for not
  const updateAvailabilityStatus = async (staffId, status) => {
  const { getStaffProfile } = useContext(StaffManagementContext);

    console.log("status", status);
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
    ContractStatus,
    getGarantorDetails,
    getMedicalDetails,
    getPoliceDetails,
    getWorkExperience,
    updateContractStatus,
    updateAvailabilityStatus,
  };
}

export default useStaff;
