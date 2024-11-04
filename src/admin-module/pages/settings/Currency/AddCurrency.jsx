import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const countryData = {
  USA: { symbol: "$", logo: "usa-logo-url" },
  UK: { symbol: "£", logo: "uk-logo-url" },
  EU: { symbol: "€", logo: "eu-logo-url" },
  // Add more countries as needed
};

function AddCurrency() {
  const [countryName, setCountryName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (countryName && countryData[countryName]) {
      setCurrencySymbol(countryData[countryName].symbol);
      setLogo(countryData[countryName].logo);
    } else {
      setCurrencySymbol("");
      setLogo("");
    }
  }, [countryName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log("Currency Added:", { countryName, currencySymbol, logo });
    navigate("/currencies");
  };

  return (
    <>
      <Helmet>
        <title>Add Currency</title>
      </Helmet>
      <div className="h-full p-6 w-full text-sm text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Add New Currency</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Name</label>
            <select
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a country</option>
              {Object.keys(countryData).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
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
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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