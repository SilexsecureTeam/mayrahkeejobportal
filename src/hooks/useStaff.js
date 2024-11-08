import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";



function useStaff() {
  const ContractStatus = {
    accept: 'Accept',
    reject: 'Reject'
  }
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
  const updateContractStatus = async (staff, status ) => {
    try {
      const { data } = await client.post(
        `/domesticStaff/update-profile/${staff.id}`,{
          ...staff,
          contract_status: status === ContractStatus.accept ? 1 : 2 
        }
      );
     return true;
    } catch (error) {
      return false;
    }
  };

  return { ContractStatus, getGarantorDetails, getMedicalDetails, getPoliceDetails, getWorkExperience, updateContractStatus };
}

export default useStaff;
