import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { useLocation } from "react-router-dom";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { extractErrorMessage } from "../../../utils/formmaters";
import { FaSpinner, FaExclamationTriangle, FaBoxOpen } from "react-icons/fa";

const navOptions = ["Active Contracts", "Market Place"];

function MarketPlace({ handleAddToCart, handleRemoveCart, cartItems }) {
  const location = useLocation();
  const info = location?.state?.data;

  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [activeOption, setActiveOption] = useState(navOptions[0]);

  const [contractItems, setContractItems] = useState([]);
  const [marketList, setMarketList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getMarketList = async () => {
    const type = info?.type;
    setLoading(true);
    setErrorMessage("");
    try {
      const { data } = await client.get("/domesticStaff/get-staff");

      if (data.domesticStaff) {
        setMarketList(
          !type
            ? data.domesticStaff
            : data.domesticStaff?.filter(
                (current) => current.staff_category === type
              )
        );
      } else {
        setMarketList([]);
      }
    } catch (error) {
      const errMsg = extractErrorMessage(error);
      setErrorMessage(errMsg || "Unable to load marketplace data.");
      if (errMsg !== "Contract(s) not found") {
        onFailure({ message: "Something went wrong", error: errMsg });
      }
    } finally {
      setLoading(false);
    }
  };

  const getContractItems = async () => {
    const type = info?.type;
    setLoading(true);
    setErrorMessage("");
    try {
      const { data } = await client.post("/contracts/details", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
      });

      if (data.contracts) {
        setContractItems(
          !type
            ? data.contracts
            : data.contracts?.filter(
                (current) =>
                  current.staff_category === type &&
                  current.status?.toLowerCase() === "active"
              )
        );
      } else {
        setContractItems([]);
      }
    } catch (error) {
      const errMsg = extractErrorMessage(error);
      setErrorMessage(errMsg || "Unable to load contract data.");
      if (error?.status !== 404) {
        onFailure({ message: "Something went wrong", error: errMsg });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContractItems();
    getMarketList();
  }, []);

  // ✅ Loading state
  const renderLoading = () => (
    <div className="flex items-center justify-center py-10 text-gray-600">
      <FaSpinner className="animate-spin text-green-500 mr-2 text-lg" />
      <span>Loading...</span>
    </div>
  );

  // ✅ Empty state (with React Icon)
  const renderEmpty = (label) => (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500 text-sm">
      <FaBoxOpen className="text-5xl mb-2 text-gray-400" />
      <span>No {label} found.</span>
    </div>
  );

  // ✅ Error state
  const renderError = () => (
    <div className="flex flex-col items-center justify-center py-10 text-red-500 text-sm">
      <FaExclamationTriangle className="text-5xl mb-2 text-red-400" />
      <span>Failed to load data.</span>
      <span className="text-gray-500 mt-1 text-xs">{errorMessage}</span>
      <button
        onClick={() => {
          setErrorMessage("");
          activeOption === navOptions[0] ? getContractItems() : getMarketList();
        }}
        className="mt-3 px-4 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="w-full space-y-8 pb-5">
      <nav className="flex bg-gray-50 gap-5 px-2 my-2">
        {navOptions.map((current) => (
          <a
            key={current}
            onClick={() => {
              setActiveOption(current);
              setErrorMessage("");
            }}
            className={`cursor-pointer flex items-center gap-2 py-2 ${
              activeOption === current
                ? "font-semibold border-b-2 border-green-500"
                : ""
            }`}
          >
            <span>{current}</span>
            <span className="flex items-center justify-center px-2 rounded-full bg-gray-700 text-white">
              {current === navOptions[0]
                ? contractItems?.length
                : marketList?.length}
            </span>
          </a>
        ))}
      </nav>

      {/* === Active Contracts === */}
      {activeOption === navOptions[0] && (
        <>
          <strong className="text-sm text-gray-700 font-medium pt-4">
            List of your currently active contracts
          </strong>

          {loading ? (
            renderLoading()
          ) : errorMessage ? (
            renderError()
          ) : contractItems.length === 0 ? (
            renderEmpty("active contracts")
          ) : (
            <TableHead>
              {contractItems
                .slice()
                .reverse()
                .map((current) => (
                  <TableRow
                    key={current?.id}
                    data={current}
                    isContractActive={true}
                  />
                ))}
            </TableHead>
          )}
        </>
      )}

      {/* === Market Place === */}
      {activeOption === navOptions[1] && (
        <>
          <strong className="text-sm text-gray-700 font-medium pt-4">
            Only available staff are shown here
          </strong>

          {loading ? (
            renderLoading()
          ) : errorMessage ? (
            renderError()
          ) : marketList.length === 0 ? (
            renderEmpty("available staff")
          ) : (
            <TableHead isMarket={true}>
              {marketList.map((current) => (
                <TableRow
                  isMarket={true}
                  key={current?.id}
                  data={current}
                  handleAddToCart={handleAddToCart}
                  handleRemoveCart={handleRemoveCart}
                  cartItems={cartItems}
                />
              ))}
            </TableHead>
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(MarketPlace);
