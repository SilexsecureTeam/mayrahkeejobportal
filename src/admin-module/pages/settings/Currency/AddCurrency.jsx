import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Select from 'react-select';
import { countries, currencies } from 'country-data';
import UseAdminManagement from "../../../../hooks/useAdminManagement";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeftLong } from "react-icons/fa6";

const countryOptions = Object.keys(countries).map(countryCode => ({
  value: countryCode,
  label: countries[countryCode].name
}));

function AddCurrency() {
  const [countryName, setCountryName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { AddFormCurrency } = UseAdminManagement();

  useEffect(() => {
    const selectedCountry = countries[countryName];
    if (selectedCountry) {
      const currencyCode = selectedCountry.currencies[0];
      const currency = currencies[currencyCode];
      setCurrencySymbol(currency.symbol);
      setFlag(`https://flagcdn.com/w320/${selectedCountry.alpha2.toLowerCase()}.png`);
    } else {
      setCurrencySymbol("");
      setFlag("");
    }
  }, [countryName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const currencyData = {
      name: countryName,
      code: currencySymbol
    };

    console.log("Submitting currency data:", currencyData);

    try {
      const response = await AddFormCurrency(currencyData);
      console.log("Response:", response);
      if (response) {
        console.log("Currency Added:", response);
        toast.success("Currency added successfully!");
        setTimeout(() => {
          navigate("/admin/settings/currency");
        }, 2000); // Delay of 2 seconds before navigating
      } else {
        toast.error("Failed to add currency");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        if (err.response.data.error.includes("The code has already been taken")) {
          toast.error("Currency already exists");
        } else {
          setError(`Error adding currency: ${err.response.data.error}`);
          toast.error(`Error adding currency: ${err.response.data.error}`);
        }
      } else {
        setError(`Error adding currency: ${err.message}`);
        toast.error(`Error adding currency: ${err.message}`);
      }
      console.error("Error details:", err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Currency</title>
      </Helmet>
      <ToastContainer />
      <div className='px-8 py-5'>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
        >
          <FaArrowLeftLong className="me-4 text-green-500" />Back
        </button>
      </div>
      <div className="h-full p-6 w-full text-sm text-gray-800 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-4 shadow-lg p-6 rounded-md bg-white w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Add New Currency</h2>
          {error && <div className="text-red-600">{error}</div>}
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
            <img src={flag} alt="Country Flag" className="mt-1 block w-8 h-8 object-contain rounded-full" />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            <FaPlus className="mr-2" />
            {loading ? 'Adding...' : 'Add Currency'}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCurrency;