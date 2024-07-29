import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { GrCircleAlert } from 'react-icons/gr'

const ApplicantLoginDetails = () => {
  return (
    <div>
      <div className="update_form py-6">
        <div>
          <form>
            <div className="border-b py-6">
              <div className="flex md:w-4/5">
                <div className=" w-2/5 pr-3">
                  <p className='font-medium text-slate-900'>Update Email</p>
                  <p>Update your email address to <br /> make sure it is safe</p>
                </div>
                <div className="w-3/5">
                  <div className="mb-4">
                    <div className='mb-5'>
                      <div className='font-medium text-slate-900 flex'>jakegyll@email.coml <span className='ml-2 prime_text'><FaRegCheckCircle /></span></div>
                      <p>Your email address is verified.</p>
                    </div>
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">Update Email</span>
                      <input type="text" value="" placeholder='Enter your new email'
                        className="mt-1 block p-2 focus:outline-none w-full border" />
                    </label>
                  </div>
                  <div className="my-3">
                    <button className="bg-green-700 hover:bg-green-900 p-2 px-4 text-white">Update Email</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form>
            <div className="border-b py-6">
              <div className="flex md:w-4/5">
                <div className=" w-2/5  pr-3">
                  <p className='font-medium text-slate-900'>New Password</p>
                  <p>Manage your password to make <br /> make sure it is safe</p>
                </div>
                <div className="w-3/5">
                  <div className="mb-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">Old Password</span>
                      <input type="text" value="" placeholder='Enter your old password'
                        className="mt-1 block p-2 focus:outline-none w-full border" />
                    </label>
                    <span className='text-sm text-slate-600'>Minimum of 8 characters</span>
                  </div>
                  <div className="mb-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-slate-700">New Password</span>
                      <input type="text" value="" placeholder='Enter your new password'
                        className="mt-1 block p-2 focus:outline-none w-full border" />
                    </label>
                    <span className='text-sm text-slate-600'>Minimum of 8 characters</span>
                  </div>
                  <div className="my-3">
                    <button className="bg-green-700 hover:bg-green-900 p-2 px-4 text-white">Update Email</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-end py-6">
            <div className="flex text-red-500 font-medium items-center">
              <span>Close Account </span>
              <span className='ml-3'><GrCircleAlert /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantLoginDetails