import { resourceUrl } from "../../services/axios-client";
import { formatDate, FormatPrice } from "../../utils/formmaters";
import { field_sections1, field_sections2 } from "../../utils/constants"; // adjust import path

const ApplicantProfileCard = ({ userData }) => {
  const isArtisan = userData?.staff_category === "artisan";
  const fieldSections = isArtisan ? field_sections2 : field_sections1;

  const image = userData?.profile_image
    ? `${resourceUrl}/${userData?.profile_image}`
    : "/placeolder2.png";

  const renderValue = (fieldName) => {
    const value = userData?.[fieldName];
    if (fieldName.includes("salary") && value) {
      return FormatPrice(Number(value));
    }
    return value ?? "N/A";
  };

  return (
    <aside className="w-full h-fit lg:w-1/4 md:min-w-80 bg-white p-6 shadow-[0_0_2px_#999] mb-4 lg:mb-0">
      <div className="text-center flex flex-wrap gap-3 justify-around">
        <img
          src={image}
          className="bg-gray-300 object-contain h-24 w-24 rounded-full"
        />
        <section>
          <h3 className="text-xl font-bold mt-4">
            {userData?.first_name} {userData?.surname}
          </h3>
          <p className="text-gray-600">{userData?.subcategory}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★★★★★</span>
          </div>
        </section>
      </div>

      <div className="mt-4 bg-gray-100 p-2">
        <div className="flex justify-between gap-2 items-center p-2 border-b ">
          <h4 className="font-bold text-gray-800">Member Since</h4>
          <p className="text-gray-500 text-sm">
            {formatDate(userData?.created_at)}
          </p>
        </div>
        <div className="p-3 mt-2 rounded-lg">
          <p className="font-semibold uppercase">{userData?.staff_category}</p>
          <p className="text-gray-500 text-sm uppercase">
            {userData?.subcategory}
          </p>
        </div>
      </div>

      {/* Primary Info */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Primary Info</h4>
        <ul className="text-gray-600 space-y-3 mt-2 break-all">
          {fieldSections.primary.map((field) => (
            <li key={field.field_name}>
              {field.name}: {renderValue(field.field_name)}
            </li>
          ))}
        </ul>
      </div>

      {/* Professional Info */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Professional Info</h4>
        <ul className="text-gray-600 space-y-3 mt-2">
          {fieldSections.professional.map((field) => (
            <li key={field.field_name}>
              {field.name}: {renderValue(field.field_name)}
            </li>
          ))}
        </ul>
      </div>

      {/* Secondary Info */}
      {fieldSections.secondary?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold text-gray-800">Other Info</h4>
          <ul className="text-gray-600 space-y-3 mt-2">
            {fieldSections.secondary.map((field) => (
              <li key={field.field_name}>
                {field.name}: {renderValue(field.field_name)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Languages</h4>
        <ul className="text-gray-600 mt-2 grid grid-cols-2 gap-1">
          {JSON.parse(String(userData?.languages_spoken) || "[]")?.map(
            (lang, index) => (
              <li key={index} className="py-1 px-2 bg-yellow-400">
                {lang}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Contact</h4>
        <ul className="text-gray-600 space-y-2 mt-2">
          <li className="flex gap-2 items-center">
            Email: <span className="break-all">{userData?.email}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ApplicantProfileCard;
