import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { AuthContext } from "../context/AuthContex";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";
import { get, set } from "idb-keyval";
import { stages } from "../utils/constants";

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
    const [interviewDetails, setInterviewDetails] = useState({})


    const onTextChange = (e) => {
      const { name, value } = e.target;
      setInterviewDetails({ ...interviewDetails, [name]: value });
    };
  

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


    const scheduleInterview = async (applicant, data, setData, handleOnSuccess) => {
         setLoading(true)
         try {
          const primarydata = {
            job_application_id: data.id,
            candidate_id: applicant.id,
          }
          const updateprimarydata = {
            job_id: data.job_id,
            candidate_id: applicant.id,
          }

           const interviewResponse = await client.post(`/interviews`,{...primarydata, ...interviewDetails})
           const interviewData = interviewResponse.data.interview
           const applicationUpdateResponse = await client.post(`/applicationRespond`,{...updateprimarydata, status: stages[1].name })
           const applicatonUpdateData = applicationUpdateResponse.data.job_application
           setData(applicatonUpdateData)
           handleOnSuccess()
         } catch (error) {
           FormatError(error, setError, 'Schedule Error')
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

    return {loading, applicants, interviewDetails, scheduleInterview, onTextChange, getApplicantsByEmployee, getApplicant};
}

export default useApplicationManagement;