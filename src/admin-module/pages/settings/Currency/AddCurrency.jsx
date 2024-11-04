import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Select from 'react-select';
import { countries, currencies } from 'country-data';

const countryOptions = Object.keys(countries).map(countryCode => ({
  value: countryCode,
  label: countries[countryCode].name
}));

function AddCurrency() {
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [flag, setFlag] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (countryName && countries[countryName]) {
      setCountryCode(countries[countryName].alpha2);
      setCurrencySymbol(currencies[countries[countryName].currencies[0]].symbol);
      setFlag(`https://flagcdn.com/w320/${countries[countryName].alpha2.toLowerCase()}.png`);
    } else {
      setCountryCode("");
      setCurrencySymbol("");
      setFlag("");
    }
  }, [countryName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log("Currency Added:", { countryName, countryCode, currencySymbol, flag });
    navigate("/currencies");
  };

  return (
    <>
      <Helmet>
        <title>Add Currency</title>
      </Helmet>
      <div className="h-full p-6 w-full text-sm text-gray-800 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-4 shadow-lg p-6 rounded-md bg-white w-1/2">
          <h2 className="text-2xl font-bold mb-4">Add New Currency</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Name</label>
            <Select
              options={countryOptions}
              value={countryOptions.find(option => option.value === countryName)}
              onChange={(option) => setCountryName(option.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Code</label>
            <input
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency Symbol</label>
            <input
              type="text"
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Flag</label>
            <img src={flag} alt="Country Flag" className="mt-1 block w-8 h-8 object-contain rounded-full"/>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <FaPlus className="mr-2" />
            Add Currency
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCurrency;