function ApplicantProfile({ data, applicant }) {
  return (
    <>
      <div className="w-full md:w-[80%] flex flex-col">
        <h3 className="font-semibold text-sm px-2">Personal Info</h3>

        <ul className="grid grid-cols-2 md:grid-cols-3 text-black gap-y-2 px-2 mt-[3px]">
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Full Name</span>
            <span className="font-semibold text-little">{data?.full_name}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Date of Birth</span>
            <span className="font-semibold text-little">{applicant?.date_of_birth}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Email</span>
            <span className="font-semibold text-little">{applicant?.email}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Gender</span>
            <span className="font-semibold text-little">{applicant?.gender}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Languages</span>
            <span className="font-semibold text-little">{applicant?.languages}</span>
          </li>
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Phone</span>
            <span className="font-semibold text-little">{applicant?.phone_number}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Address</span>
            <span className="font-semibold text-little">{applicant?.contact_address}</span>
          </li>
        </ul>
      </div>
      <hr className="h-[1px] bg-gray-800 w-full my-4" />

      <div className="w-full md:w-[80%] flex flex-col">
        <h3 className="font-semibold text-sm px-2">Professional Info</h3>

        <span className="text-sm px-2 text-gray-800 mt-2">About me</span>

        <div className="flex flex-col px-2 mt-1 gap-[5px]">
          <p className="text-little">{applicant?.personal_profile}</p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 px-2 mt-2">
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Current Job</span>
            <span className="font-semibold text-little">Product Designer</span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Work Experience</span>
            <span className="font-semibold text-little">{applicant?.work_experience}</span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Certification Held</span>
            <div dangerouslySetInnerHTML={{ __html: data?.educational_qualification }} />
          </li>
        </ul>
      </div>
    </>
  );
}

export default ApplicantProfile;
