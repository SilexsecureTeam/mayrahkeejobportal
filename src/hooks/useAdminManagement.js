import { useContext, useEffect, useState, useCallback } from "react";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContex";
import { get, set } from "idb-keyval";
import axios from "axios";
import { BASE_URL } from "../utils/base";
import { user } from './../utils/dummies';
import MainAxios from "../services/axios-main";
// import AddCurrency from './../admin-module/pages/settings/Currency/AddCurrency';

const PROFILE_DETAILS_KEY = "Admin Profile Detaials Database";

function UseAdminManagement() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [profileDetails, setProfileDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const adminProfile = async () => {
    setLoading(true);
    // const { data } = await client.get(
    //   `/domesticStaff/get-staff/${authDetails.user.id}`
    // );
    // await set(PROFILE_DETAILS_KEY, data.data);
    setProfileDetails(authDetails.user);
    setLoading(false);
  };

  useEffect(() => {
    const initProfileDetails = async () => {
      try {
        // const dataFromDB = await get(PROFILE_DETAILS_KEY);
        // if (dataFromDB) {
        //   setProfileDetails(dataFromDB);
        //   return;
        // }
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
      const response = await MainAxios.post("update-status", data);
      return response.data;
    } catch (error) {
      console.error('Error updating status:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };




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


  const getCurrencies = async () => {
    try {
      setLoading(true);
      const response = await client.get("/currencies");
      return response.data;
    } catch (error) {
      console.error("Error fetching currencies:", error);
      return (error);
    } finally {
      setLoading(false);
    }
  }

  const AddFormCurrency = async (currencyData) => {
    try {
      setLoading(true);
      console.log("Sending currency data to API:", currencyData);
      const response = await client.post("/currencies", currencyData);
      return response;
    } catch (error) {
      if (error.status === 500) {
        return error
      }
      console.error("Error adding currency:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCurrencyById = async (id) => {
    try {
      setLoading(true);
      const response = await client.delete(`/currencies/${id}`);
      return response.data;
    }
    catch (error) {
      console.error("Error deleting currency:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const getSectors = async () => {
    try {
      setLoading(true);
      const response = await client.get("/sectors");
      const sectors = response.data.data;
      console.log(sectors);
      // Fetch subcategories for each sector
      const sectorsWithSubcategories = await Promise.all(
        sectors.map(async (sector) => {
          const subResponse = await client.get(`/sub-sectors/${sector.id}`);
          return {
            ...sector,
            subcategories: subResponse.data.data,
          };
        })
      );

      return sectorsWithSubcategories;
    } catch (error) {
      console.error("Error fetching sectors:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const createSector = async (sector) => {
    try {
      setLoading(true);
      const response = await client.post("/sectors", sector);
      return response.data;
    } catch (error) {
      console.error("Error creating sector:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createSubsector = async (subsector) => {
    try {
      const response = await client.post("/sub-sectors", subsector);
      return response.data;
    } catch (error) {
      console.error("Error creating subsector:", error);
      return null;
    }
  };

  const createSectorWithSubsectors = async (sector, subsectors) => {
    try {
      setLoading(true);
      const createdSector = await createSector(sector);
      if (createdSector && createdSector.data) {
        const sectorId = createdSector.data.id;
        const subSectorPromises = subsectors.map(subsector => {
          return createSubsector({ name: subsector, sector_id: sectorId });
        });
        const createdSubsectors = await Promise.all(subSectorPromises);
        return { sector: createdSector, subsectors: createdSubsectors };
      }
      return null;
    } catch (error) {
      console.error("Error creating sector and subsectors:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const deleteSectorById = async (id) => {
    try {
      setLoading(true);
      const response = await client.delete(`/sectors/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting sector:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteSubsectorById = async (id) => {
    try {
      setLoading(true);
      const response = await client.delete(`/sub-sectors/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting subsector:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const adminLogin = async (data) => {
    try {
      setLoading(true);
      const response = await client.post("/admin/login", data);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const AdminLogout = async () => {
    // console.log(authDetails?.token);
    
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/admin/logout`, {}, {
        headers: {
          Authorization: `${authDetails?.token}`
        }
      });
      console.log("response", response.status);
      
      return response.status;
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  };

  const AdminRegistration = async (data) => {
    try {
      setLoading(true)
      const response = await client.post('/admin/register', data)
      console.log("response registration", response);
      return response

    } catch (error) {
      if (error.status === 400) {
        return error
      }
      console.error('Error in registration', error.status)
    }
    finally {
      setLoading(false)
    }
  }

  const AdminChangePwd = async (data) => {
    try {
      setLoading(true)
      const response = await client.post('/changePassword', data)
      return response.data
    }
    catch (error) {
      console.error('Error', error.message)
    }
    finally {
      setLoading(false)
    }
  }

  const AdminForgotPwd = async (data) => {
    try {
      setLoading(true)
      const response = await client.post('/forgotten-password', data)
      console.log("response", response);
      return response.status
    }
    catch (error) {
      console.error('Error', error)
      return error
    }
    finally {
      setLoading(false)
    }
  }

  const AdminResetPwd = async (data) => {
    try {
      setLoading(true)
      const response = await client.post('/etPassword', data)
      return response.data
    }
    catch (error) {
      console.error('Error', error.message)
    }
    finally {
      setLoading(false)
    }
  }

  const getAllJobs = async () => {
    try {
      setLoading(true)
      const response = await client.get("/job")
      return response.data
    } catch (error) {
      console.error("error getting jobs", error)
    }
    finally {
      setLoading(false)
    }
  }

  const getJobById = async (id) => {
    try {
      setLoading(true)
      const response = await client.get(`/job/${id}`)
      return response.data
    }
    catch (error) {
      console.log('Error getting job by id', error)
    }
    finally {
      setLoading(false)
    }
  }

  const getSalaries = async () => {
    try {
      setLoading(true)
      const response = await client.get('/salaries')
      return response.data
    }
    catch (err) {
      console.error('Error getting salaries', err)
      return null
    }
    finally {
      setLoading(false)
    }
  }



  const deleteSalaryById = async (id) => {
    try {
      setLoading(true);
      const response = await client.delete(`/salaries/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting sector:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

const createSalary = async (data) => {
  try {
    setLoading(true)
    const response = await client.post('/salaries', data)
    return response.data
  }
  catch (err) {
    console.error('Error creating salary', err)
    return null
  }
  finally {
    setLoading(false)
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
    AddFormCurrency,
    getSectors,
    createSector,
    createSubsector,
    createSectorWithSubsectors,
    deleteSectorById,
    deleteSubsectorById,
    getCurrencies,
    deleteCurrencyById,
    adminLogin,
    AdminLogout,
    AdminRegistration,
    AdminChangePwd,
    AdminForgotPwd,
    AdminResetPwd,
    getAllJobs,
    getJobById,
    getSalaries,
    deleteSalaryById,
    createSalary,
  };
}

export default UseAdminManagement;