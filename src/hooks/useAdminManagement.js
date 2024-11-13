import { useContext, useEffect, useState, useCallback } from "react";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContex";
import { get, set } from "idb-keyval";
import axios from "axios";
import { BASE_URL } from "../utils/base";
import { user } from './../utils/dummies';
import MainAxios from "../services/axios-main";
import AddCurrency from './../admin-module/pages/settings/Currency/AddCurrency';

const PROFILE_DETAILS_KEY = "Admin Profile Detaials Database";

function UseAdminManagement() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [profileDetails, setProfileDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const adminProfile = async () => {
    // setLoading(true);
    // const { data } = await client.get(
    //   `/domesticStaff/get-staff/${authDetails.user.id}`
    // );
    // await set(PROFILE_DETAILS_KEY, data.data);
    // setProfileDetails(data.data);
    // setLoading(false);
  };

  useEffect(() => {
    const initProfileDetails = async () => {
      try {
        const dataFromDB = await get(PROFILE_DETAILS_KEY);
        if (dataFromDB) {
          setProfileDetails(dataFromDB);
          return;
        }
        adminProfile();
      } catch (error) {
        console.error("Profile Error:", error);
      }
    };
    initProfileDetails();
  }, []);


  const getEmployers = async () => {
    try {
      setLoading(true);
      const response = await client.get(`/getEmployer`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employers:", error);
      return []; // Return an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  const getEmployerById = async (id) => {
    try {
      setLoading(true);
      const response = await client.get(`/employer/getEmployer/${id}`);
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };


  const getArtisans = async () => {
    setLoading(true);
    try {
      const response = await client.get(`/domesticStaff/staff-type?staff_category=artisan`);
      return response.data.domesticStaff;
    } catch (error) {
      console.error("Error fetching artisans:", error);
      return []; // Return an empty array in case of error
    } finally {
      setLoading(false);
    }
  }


  const getDomesticStaff = async () => {
    try {
      setLoading(true);
      const response = await client.get(`/domesticStaff/staff-type?staff_category=staff`);
      return response.data.domesticStaff;
    } catch (error) {
      console.error("Error fetching domestic staff:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  const getStaffById = async (id) => {
    try {
      setLoading(true);
      const response = await client.get(`/domesticStaff/get-staff/${id}`);
      const data = response.data;
      data.data.name = `${data?.data?.first_name} ${data.data.middle_name === null || data.data.middle_name === 'null' ? '' : data.data.middle_name} ${data.data.surname}`;
      return data;
    } catch (error) {
      console.error("Error fetching staff:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }



  const updateStatus = async (data) => {
    try {
      setLoading(true);
      const response = await client.post("/update-status/", data);
      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }


  const getCandidates = async () => {
    try {
      setLoading(true);
      console.log("Fetching employers...");
      const response = await client.get(`/candidate/getCandidate`);
      console.log("Employers fetched:", response.data);
      return response.data.candidateAuths;
    } catch (error) {
      console.error("Error fetching employers:", error);
      return []; // Return an empty array in case of error
    } finally {
      setLoading(false);
    }
  };



  const getCandidateById = async (id) => {
    try {
      setLoading(true);
      const response = await client.get(`/candidate/getCandidate/${id}`);
      console.log(response.data.details)
      return response.data.details;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  }

  const getJobsByEmployerId = async (id) => {
    try {
      setLoading(true);
      const response = await client.get(`/job-employer-id/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  const jobsAppliedToEmployerId = async (id) => {
    try {
      setLoading(true)
      const response = await client.get(`/getEmployerApply/${id}`)
      return response.data.job_application
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    finally {
      setLoading(false)
    }
  }

  const getEmployerDomesticStaff = async (id) => {
    try {
      setLoading(true);
      const response = await MainAxios.post(`/contracts/details`, {
        user_id: id,
        user_type: 'employer'
      });
      const data = response.data.contracts;
      const updatedData = await Promise.all(data.map(async (contract) => {
        const staff = await getStaffById(contract.domestic_staff_id);
        if (staff && staff.data) {
          contract.staff_name = staff.data.name;
        } else {
          contract.staff_name = 'Unknown'; // or any default value
        }
        return contract;
      }));
      return updatedData;
    } catch (error) {
      console.error('Error fetching employer domestic staff:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const getCandidateDomesticStaff = async (id) => {
    try {
      setLoading(true);
      const response = await MainAxios.post(`/contracts/details`, {
        user_id: id,
        user_type: 'candidate'
      });
      const data = response.data.contracts;
      data.forEach((contract) => {
        getStaffById(contract.domestic_staff_id).then((staff) => {
          contract.staff_name = staff.data.name;
          contract.staff_cateory = staff.data.staff_category
        })
      })
      console.log(data);
      return data
      // return response.data.contracts;
    } catch (error) {
      console.error('Error fetching employer domestic staff:', error);
    }
    finally {
      setLoading(false);
    }
  }



  const getStaffReportById = async (reportType, candidateId) => {
    try {
      setLoading(true);
      const response = await client.get(`/domesticStaff/${reportType}/${candidateId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching report:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }



  const getStaffReport = async (reportType) => {
    try {
      setLoading(true);
      const response = await client.get(BASE_URL + "/domesticStaff/" + reportType)
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching report:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };


const AddFormCurrency = async(currencyData)=>{
  try {
    setLoading(true);
    const response = await client.post("/currencies", currencyData);
    return response.data;
  } catch (error) {
    console.error("Error adding currency:", error);
    return null;
  } finally {
    setLoading(false);
  }
}



  return {
    loading,
    profileDetails,
    adminProfile,
    getEmployers,
    getArtisans,
    getEmployerById,
    getDomesticStaff,
    getStaffById,
    getCandidates,
    updateStatus,
    getCandidateById,
    getJobsByEmployerId,
    jobsAppliedToEmployerId,
    getEmployerDomesticStaff,
    getCandidateDomesticStaff,
    getStaffReportById,
    getStaffReport,
    AddFormCurrency
  };
}

export default UseAdminManagement;