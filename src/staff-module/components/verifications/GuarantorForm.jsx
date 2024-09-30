import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import { useState } from "react";

const formFields = [
  "first_name",
  "last_name",
  "phone_number",
  "email",
  "occupation",
  "date_of_birth",
  "residential_address",
  "near_bus_stop",
  "close_landmark",
  "close_landmark",
];

function GuarantorForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  return (
    <div>
      <h1 className="text-xl font-semibold">Guarantor Details</h1>

      <form
        onSubmit={handleSubmit()}
        className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
      >
        {formFields.map((currentKey) => {
          const detail = formFields[currentKey];
          const labelText = currentKey.replace(/_/g, " ").toUpperCase();

          const inputType = currentKey == "member_since" ? "date" : "text";
          return (
            <div className="flex flex-col gap-1">
              <label>{labelText}</label>
              <input
                className="p-1 border focus:outline-none border-gray-900  rounded-md"
                type={inputType}
                defaultValue={detail}
                {...register(currentKey)}
              />
            </div>
          );
        })}
        <FormButton loading={loading}>Upload Garantor Details</FormButton>
      </form>
    </div>
  );
}

export default GuarantorForm;
