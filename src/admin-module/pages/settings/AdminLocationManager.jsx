import { useEffect, useState } from "react";
import CountryTable from "./CountryTable";
import StateTable from "./StateTable";
import LGATable from "./LGATable";
import { useLocationService } from "../../../services/locationService";

const AdminLocationManager = () => {
  const [tab, setTab] = useState("countries");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const { getCountries, getStates } = useLocationService();

  useEffect(() => {
    getCountries()
      .then((res) => setCountries(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    getStates()
      .then((res) =>
        setStates(
          res.data.filter((s) => s.country_id === parseInt(selectedCountry))
        )
      )
      .catch(console.error);
  }, [selectedCountry]);

  const tabs = [
    { id: "countries", label: "Countries" },
    { id: "states", label: "States" },
    { id: "lgas", label: "LGAs" },
  ];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">🌍 Location Management</h2>

      <div className="flex space-x-4 border-b pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-t-md font-medium ${
              tab === t.id
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 shadow rounded">
        {tab === "countries" && <CountryTable />}

        {tab === "states" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Filter by Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
              >
                <option value="">-- Select Country --</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCountry ? (
              <StateTable filterByCountryId={parseInt(selectedCountry)} />
            ) : (
              <p className="text-gray-500">
                Please select a country to view its states.
              </p>
            )}
          </>
        )}

        {tab === "lgas" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Filter by State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
              >
                <option value="">-- Select State --</option>
                {states.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedState ? (
              <LGATable filterByStateId={parseInt(selectedState)} />
            ) : (
              <p className="text-gray-500">
                Please select a state to view its LGAs.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLocationManager;
