import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";

function useStaff() {
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

  return { getGarantorDetails, getMedicalDetails, getPoliceDetails };
}

export default useStaff;
