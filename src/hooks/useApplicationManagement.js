import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContex";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";
import { get, set } from "idb-keyval";

const APPLICANTS_KEY = 'Applicants Database'

function useApplicationManagement() {
    const {authDetails} = useContext(AuthContext)
    const client = axiosClient(authDetails.token)
    const [loading, setLoading] = useState(false) 
    const [error, setError] = useState({
        message: '',
        error: ''
    }) 
    const [applicants, setApplicants] = useState([])   

    const getApplicantsByEmployee = async () => {
          setLoading(true)
          try {
            const response = await client(`getEmployerApply/${authDetails.user.id}`)
            await set(APPLICANTS_KEY, response.data.job_application)
            setApplicants(response.data.job_application)
          } catch (error) {
             FormatError(error, setError, 'Applicants Error')
          } finally{
            setLoading(false)
          }
    }
    

    const getApplicant = async (applicantId) => {
      setLoading(true)
      try {
        const response = await client(`/candidate/getCandidate/${applicantId}`)
        return response.data.details
      } catch (error) {
         FormatError(error, setError, 'Applicants Error')
      } finally{
        setLoading(false)
      }
    }

    useEffect(() => {
        if(error.error && error.message){
            onFailure(error)
        }
    }, [error.message, error.error])

    useEffect(() => {
      const initValue = async () => {
        try {
          const storedValue = await get(APPLICANTS_KEY);
          if (storedValue !== undefined) {
            setApplicants([...storedValue]);
          } else {
            await getApplicantsByEmployee()
          }
        } catch (error) {
          FormatError(error, setError, "Index Error");
        }
      };
  
      initValue();
    }, [])

    return {loading, applicants, getApplicantsByEmployee, getApplicant};
}

export default useApplicationManagement;