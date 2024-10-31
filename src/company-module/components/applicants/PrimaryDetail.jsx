import React from 'react';
import { apiURL, resourceUrl } from "../../../services/axios-client";
import { company_socials } from "../../../utils/constants";
import linkedinIcon from "../../../assets/pngs/linkedin-icon.png";

function PrimaryDetail({ data, applicant }) {
  const getSocials = () => {
    const list = applicant?.social_media_handle
      .map((current, index) => {
        if (current.network === "linkedIn") {
          return (
            <a key={index} href="" className="w-full flex text-little gap-[5px] items-center">
              <img src={linkedinIcon} className="h-[15px]" alt="LinkedIn" />
              {current.url}
            </a>
          );
        }
      })
      .filter((current) => typeof current !== 'undefined');

    if (list.length > 0 && list.length) {
      return list;
    } else {
      return <span className="text-little text-gray-400">No socials linked</span>;
    }
  };

  return (
    <div className="w-full md:w-[30%] border h-full p-2">
      <div className="w-full flex flex-col gap-[15px] items-center">
        <div className="flex w-full gap-[10px] items-center flex-wrap md:flex-nowrap">
          <img
            src={`${resourceUrl}/${applicant?.profile}`}
            className="h-[60px] w-[60px] bg-gray-400 rounded-full"
            alt="Profile"
          />
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold">{data?.full_name}</h3>
            <span className="text-sm text-gray-800">{data?.job_title}</span>
          </div>
        </div>

        <div className="w-full h-auto md:h-[100px] text-white flex flex-col gap-[5px] bg-primaryColor">
          <div className="w-full flex p-2 border-b border-gray-400 justify-between text-xs md:text-sm">
            <span>Applied Job</span>
            <span>{new Date(data?.created_at).toLocaleDateString()}</span>
          </div>
          <div className="w-full flex flex-col p-2 gap-[5px] text-center md:text-left">
            <span className="font-semibold text-xs md:text-sm">{data?.job_title}</span>
            <span className="text-little">Marketing - Full time</span>
          </div>
        </div>

        <div className="w-full h-[30px] text-white flex justify-between px-2 py-1 gap-[5px] bg-primaryColor text-xs md:text-sm">
          <span>Status</span>
          <span className="uppercase">{data?.status}</span>
        </div>

        <hr className="h-[1px] bg-gray-400 w-full" />

        <div className="flex flex-col w-full gap-[5px] text-center md:text-left">
          <span className="font-semibold text-sm">Contact</span>
          <ul className="w-full flex flex-col gap-[10px]">{getSocials()}</ul>
        </div>
      </div>
    </div>
  );
}

export default PrimaryDetail;
