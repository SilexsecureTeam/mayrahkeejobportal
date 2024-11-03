import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { axiosClient } from "../../../services/axios-client";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const navOptions = ["Active Contracts", "Market Place"];

function MarketPlace() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const [activeOption, setActiveOption] = useState(navOptions[0]);

  const [contractItems, setContractItems] = useState([]);

  const getContractItems = async () => {
    try {
      const { data } = await client.post("/contracts/details", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
      });

      if (data.contracts) {
        setContractItems(data.contracts);
      } else {
        setContractItems([]);
      }
    } catch (error) {
      onFailure({
        message: "soemthing went wrong",
        error: "Error retriving carted items",
      });
    }
  };

  useEffect(() => {
    getContractItems();
  }, []);

  return (
    <div className="w-full space-y-8  ">
      <nav className="flex bg-gray-50 gap-5 px-2">
        {navOptions.map((current) => (
          <a
            href="#"
            key={current}
            onClick={() => setActiveOption(current)}
            className={`py-2 ${
              activeOption === current
                ? "font-semibold border-b-2 border-green-500"
                : ""
            }`}
          >
            {current}
          </a>
        ))}
      </nav>

      <TableHead>
        {contractItems.length > 0 &&
          contractItems
            .filter((current) => current.middle_name).reverse()
            .map((current) => <TableRow key={current.id} data={current} />)}
      </TableHead>
    </div>
  );
}

export default MarketPlace;
