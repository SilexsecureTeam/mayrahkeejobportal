import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { GrCircleAlert } from 'react-icons/gr'
import NotificationModal from '../../../../components/NotificationModal'
import DeleteUser from './DeleteUser'

const ApplicantLoginDetails = ({ authDetails }) => {
  return (
    <div className="p-4 md:p-6">
      <div className="update_form py-6">
        <div>
          <form>
            <div className="border-b py-6">
              <div className="md:flex md:w-4/5">
                <div className="w-full md:w-2/5 pr-3 mb-4 md:mb-0">
                  <p className="font-medium text-slate-900">New Password</p>
                  <p className="text-sm text-slate-700">
                    Manage your password to make <br /> sure it is safe
                  </p>
                </div>
                <div className="w-full md:w-3/5">
                  <div className="mb-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">Enter New Password</span>
                      <input 
                        type="password" 
                        placeholder="Enter your old password"
                        className="mt-1 block p-2 focus:outline-none w-full border"
                      />
                    </label>
                    <span className="text-sm text-slate-600">Minimum of 8 characters</span>
                  </div>
                  <div className="mb-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">Reconfirm New Password</span>
                      <input 
                        type="password" 
                        placeholder="Enter your new password"
                        className="mt-1 block p-2 focus:outline-none w-full border"
                      />
                    </label>
                    <span className="text-sm text-slate-600">Minimum of 8 characters</span>
                  </div>
                  <div className="my-3">
                    <button className="bg-green-700 hover:bg-green-900 p-2 px-4 text-white w-full md:w-auto">Update Password</button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <DeleteUser authDetails={authDetails} />
        </div>
      </div>
    </div>
  )
}

export default ApplicantLoginDetails
