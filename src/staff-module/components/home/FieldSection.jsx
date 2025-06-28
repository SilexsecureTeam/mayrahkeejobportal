export default function FieldSection({
  title,
  fields,
  register,
  profileDetails,
}) {
  return (
    <div className="flex flex-col gap-5 border-b pb-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {fields.map((field, index) => {
          const value = profileDetails[field.field_name] || "";
          const isRequired = ![
            "middle_name",
            "business_email",
            "business_registration_no",
            "years_of_incorporation",
          ].includes(field.field_name);

          return (
            <div key={index} className="flex flex-col gap-1">
              <label>
                {field.name}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
              </label>
              {field.type === "select" ? (
                <select
                  defaultValue={value}
                  {...register(field.field_name)}
                  className="p-1 border border-gray-900 rounded-md"
                  required={isRequired}
                >
                  <option disabled value="">
                    -- Select {field.name} --
                  </option>
                  {field.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  defaultValue={value}
                  {...register(field.field_name)}
                  className="p-1 border border-gray-900 rounded-md"
                  required={isRequired}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
