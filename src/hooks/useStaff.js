import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { FormatError } from "../utils/formmaters";
import { StaffManagementContext } from "../context/StaffManagementModule";
import { allStatus } from "./useStaffUser";

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
        success: 'You have completed this contract'
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


  const getStyling = (status) => {
    switch(status){
      case allStatus[0] : return 'bg-primaryColor';
      case allStatus[1] : return 'bg-yellow-500';
      case allStatus[2] : return 'bg-red-500';
      case allStatus[3] : return 'bg-red-700';
      default : return 'bg-yellow-500'
    }
}

  return {
    ContractStatus,
    getGarantorDetails,
    getMedicalDetails,
    getPoliceDetails,
    getWorkExperience,
    updateContractStatus,
    getStyling
  };
}

export default useStaff;
