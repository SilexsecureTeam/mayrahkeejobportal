import { useForm } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import { useState } from "react";
import { Country, State, City } from "country-state-city";

const formFields = ["station_address"];

function PoliceReport() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const countries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectStates, setSelectStates] = useState();
  const [selectState, setSelectState] = useState();
  const [selectCity, setSelectCity] = useState();
  const [selectCities, setSelectCities] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });

  return (
    <div>
      <h1 className="text-xl font-semibold">Police Report</h1>

      <form
        onSubmit={handleSubmit()}
        className="grid grid-cols-2 gap-x-3 gap-y-5 p-2 w-full text-gray-600"
      >
        <label className="flex flex-col justify-center gap-1">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Country
          </span>
          <select
            name="country"
            onChange={(e) => {
              const states = State.getStatesOfCountry(e.target.value);
              setSelectStates(states);
              setSelectedCountry(Country.getCountryByCode(e.target.value));
            }}
            className="p-1 border w-full focus:outline-none border-gray-900  rounded-md"
          >
            <option value="">-- select --</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col justify-center gap-1">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            State
          </span>
          <select
            name="state"
            onChange={(e) => {
              const cities = City.getCitiesOfState(
                selectedCountry.isoCode,
                e.target.value
              );
              console.log(cities);
              setSelectCities(cities);
            }}
            className="p-1 border w-full focus:outline-none border-gray-900  rounded-md"
          >
            <option value="">-- select --</option>
            {selectStates?.map((each) => (
              <option key={each.name} value={each.isoCode}>
                {each.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col justify-center gap-1">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Local Governmennt
          </span>
          <select
            name="local_gov"
            className="p-1 border w-full focus:outline-none border-gray-900  rounded-md"
          >
            <option value="">-- select --</option>
            {selectCities?.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </label>

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
         <div className="flex flex-col gap-1">
          <label>Upload Report</label>
          <input
            className="p-1 border focus:outline-none border-gray-900  rounded-md"
            type="file"
            accept=".pdf, .doc, .jpeg, .jpg"
          />
        </div>
        <div></div>
        <FormButton loading={loading}>Upload Police Records</FormButton>
      </form>
    </div>
  );
}

export default PoliceReport;
