import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../../utils/base';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContex';

const ShortListedDetails = () => {
  const { state } = useLocation()
  const { authDetails } = useContext(AuthContext)
  const [newInterview, setNewInterview] = useState();

  const getInterviews = (id, setState) => {
    axios.get(`${BASE_URL}/interviews/${id}`, {
      headers: {
        Authorization: `Bearer ${authDetails.token}`,
      },
    })
      .then((response) => {
        // console.log(response)
        setState(response.data.interview)
        // onSuccess({
        //     message: 'New Application',
        //     success: response.data.message
        // })
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          setErrorMsg(error.response.data.message)
        } else {
          console.log(error)
          setErrorMsg(error.message)
        }
      });
  }

  useEffect(() => {
    getInterviews(state.app?.interview_id, setNewInterview)
  }, [])

  console.log(newInterview)

  const date = new Date(newInterview?.interview_date)
  return (
    <div>
      <div className="h-full p-8 w-full text-s text-primary">
        <h4 className=" font-semibold text-2xl mb-5">Your Interview Information</h4>

        <div className=" shadow-2xl rounded w-[80%] border">
          <div className="flex">
            <div className="w-1/3 bg-[#47AA4933] p-4">
              <p className='font-bold'>Interviewer's Name:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{newInterview?.interviewer_name}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-[#47AA4933] p-4">
              <p className='font-bold'>Interview Date:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{date.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-[#47AA4933] p-4">
              <p className='font-bold'>Interview Time:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{newInterview?.interviewer_time ? newInterview.time : "not available"}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-[#47AA4933] p-4">
              <p className='font-bold'>Location:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{newInterview?.location}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 bg-[#47AA4933] p-4">
              <p className='font-bold'>Note:</p>
            </div>
            <div className="w-2/3 p-4">
              <p>{newInterview?.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShortListedDetails