import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient, resourceUrl } from "../../../services/axios-client";
import { get, set } from "idb-keyval";
import { StaffManagementContext } from "../../../context/StaffManagementModule";
//import { getBusinessDetails } from "../../../hooks/useStaff";
import { MdAccountCircle } from "react-icons/md";
import { field_sections1, field_sections2 } from "../../../utils/constants";

const PROFILE_DETAILS_KEY = "Staff Profile Detaials Database";

function ViewProfileDetails() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);
  const [loading, setLoading] = useState(false);
  const { profileDetails, getStaffProfile } = useContext(
    StaffManagementContext
  );

  const fieldSet =
    authDetails?.user?.staff_category !== "artisan"
      ? field_sections1
      : field_sections2;

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="text-xl text-green-700 font-semibold">
        Your Profile Information
      </h1>
      <figure className="h-[100px] w-[100px] rounded-full overflow-hidden bg-secondaryColor flex items-center justify-center text-gray-500 border border-[#dee2e6]">
        {!profileDetails?.profile_image ? (
          <MdAccountCircle size={45} />
        ) : (
          <img
            src={`${resourceUrl}${profileDetails?.profile_image}`}
            alt="User"
            className="h-[100px] w-[100px] rounded-full object-cover"
          />
        )}
      </figure>

      {profileDetails ? (
        <>
          <div>
            {Object.entries(fieldSet).map(
              ([sectionKey, fields], sectionIndex) => (
                <div key={sectionIndex} className="w-full my-6">
                  <h2 className="text-2xl font-semibold text-gray-700 capitalize mb-4 border-b pb-1">
                    {sectionKey.replace(/_/g, " ")} Details
                  </h2>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-8 p-2 w-full text-gray-600 break-words">
                    {fields.map(({ field_name, name }, index) => {
                      const detail = profileDetails[field_name];

                      return (
                        <div key={index} className="flex flex-col gap-1">
                          <label className="px-2 py-1 font-semibold bg-gray-50 capitalize">
                            {name}
                          </label>
                          {field_name !== "languages_spoken" ? (
                            <p className="px-2 text-wrap">
                              {detail ? detail : "Pending"}
                            </p>
                          ) : (
                            <div className="flex flex-wrap gap-2 px-2">
                              {detail?.map((lang, i) => (
                                <p key={i}>
                                  {lang}
                                  {i < detail.length - 1 && ", "}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
            {authDetails?.user?.staff_category === "artisan" &&
              profileDetails?.id_upload && (
                <div className="flex flex-col gap-2 text-gray-700">
                  <span className="font-semibold">
                    Means of Identification:
                  </span>
                  {/\.(jpg|jpeg|png)$/i.test(profileDetails.id_upload) ? (
                    <img
                      src={`${resourceUrl}${profileDetails.id_upload}`}
                      alt="Uploaded ID"
                      className="w-64 border rounded"
                    />
                  ) : (
                    <a
                      href={`${resourceUrl}${profileDetails.id_upload}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Uploaded ID
                    </a>
                  )}
                </div>
              )}
          </div>
        </>
      ) : (
        <span>Loading Data</span>
      )}
    </div>
  );
}

export default ViewProfileDetails;
