import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { FormatError } from "../utils/formmaters";
import { AuthContext } from "../context/AuthContex";
import { onFailure } from "../utils/notifications/OnFailure";


function useChats() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token, true);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState({
    message: "",
    error: "",
  });



  const onTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };


  
  const sendMessage  = async (message, onSuccess) => {
    setLoading(true);
    try {
      const {data} = await client.post("/messages/send", message);
      getMessages(message.receiver_id, onSuccess)
    } catch (error) {
      FormatError(error);
    } finally{
      setLoading(false)
    }
  };

  const getMessages = async (candidateId, onSuccess) => {
    setLoading(true);
    try {
      const {data} = await client.get(`/messages/all/${candidateId}/candidate/${authDetails.user.id}/${authDetails.user.role}`);
      setMessages(data.messages);
      onSuccess()
    } catch (error) {
      FormatError(error, setError, "Update Error");
    } finally {
      setLoading(false);
    }
  }


  const deleteJob = async (handleSuccess, jobId) => {
    setLoading(true)
    try {
       const response = await client.delete(`/job/${jobId}`)
       await getJobsFromDB()
       handleSuccess()
    } catch (error) {
        FormatError(error, setError, 'Delete Job')
    } finally{
      setLoading(false)
    }
  }


  return { loading, messages, onTextChange, setDetails, sendMessage, deleteJob, getMessages};
}

export default useChats;
