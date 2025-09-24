import { formatDate } from "../../../utils/formmaters";

function ApplicantProfile({ data, applicant }) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Personal Info Section */}
      <div className="w-full md:w-[80%] flex flex-col mb-4">
        <h3 className="font-semibold text-sm px-2">Personal Info</h3>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-3 text-black px-2 mt-1">
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Full Name</span>
            <span className="font-semibold text-xs break-words">
              {data?.full_name}
            </span>
          </li>
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Date of Birth</span>
            <span className="font-semibold text-xs">
              {formatDate(applicant?.date_of_birth)}
            </span>
          </li>
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Email</span>
            <span className="font-semibold text-xs break-words">
              {applicant?.email}
            </span>
          </li>
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Gender</span>
            <span className="font-semibold text-xs">{applicant?.gender}</span>
          </li>
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Languages</span>
            <div className="flex flex-wrap gap-1">
              {applicant?.languages ? (
                applicant.languages.split(",").map((lang, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-gray-100 rounded-md text-xs font-semibold capitalize break-words"
                  >
                    {lang.trim()}
                  </span>
                ))
              ) : (
                <span className="text-xs font-semibold">N/A</span>
              )}
            </div>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Phone</span>
            <span className="font-semibold text-xs break-words">
              {applicant?.phone_number}
            </span>
          </li>
          <li className="flex flex-col md:col-span-3">
            <span className="text-gray-800 text-sm">Address</span>
            <span className="font-semibold text-xs break-words whitespace-normal">
              {applicant?.contact_address}
            </span>
          </li>
        </ul>
      </div>

      <hr className="h-px bg-gray-300 w-full mb-4" />

      {/* Professional Info Section */}
      <div className="w-full md:w-[80%] flex flex-col">
        <h3 className="font-semibold text-sm px-2">Professional Info</h3>

        <span className="text-sm px-2 text-gray-800 mt-2">About me</span>
        <div className="flex flex-col px-2 mt-1 gap-1">
          <p className="text-xs break-words whitespace-pre-line">
            {applicant?.personal_profile ?? "N/A"}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 px-2 mt-2">
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Work Experience</span>
            <span className="font-semibold text-xs break-words">
              {applicant?.work_experience}
            </span>
          </li>
          <li className="flex flex-col">
            <span className="text-gray-800 text-sm">Certification Held</span>
            <span className="text-xs font-semibold break-words whitespace-pre-line">
              {applicant?.educational_qualification}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ApplicantProfile;
