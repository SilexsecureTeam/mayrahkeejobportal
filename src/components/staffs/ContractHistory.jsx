import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { axiosClient } from "../../services/axios-client";
import TableHead from "./marketplace/TableHead";
import TableRow from "./marketplace/TableRow";
import { onFailure } from "../../utils/notifications/OnFailure";

function ContractHistory() {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);

  const [contractItems, setContractItems] = useState([]);
  const [marketList, setMarketList] = useState([]);

  const getMarketList = async () => {
    try {
      const { data } = await client.get("/domesticStaff/get-staff");

      if (data.domesticStaff) {
        setMarketList(data.domesticStaff);
      } else {
        setMarketList([]);
      }
    } catch (error) {
      onFailure({
        message: "soemthing went wrong",
        error: "Error retriving carted items",
      });
    }
  };

  const getContractItems = async () => {
    try {
      const { data } = await client.post("/contracts/details", {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role,
      });

      if (data?.contracts) {
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
    // getMarketList();
  }, []);
  return (
    <div className="h-full w-full flex flex-col py-5 gap-[15px]">
      <span>Here is a detailed track record of all your contract history.</span>
      <TableHead>
        {contractItems.length > 0 &&
          contractItems
            .filter((current) => current.middle_name)
            .reverse()
            .map((current, index) => (
              <TableRow key={current.id + index} data={current} />
            ))}
      </TableHead>
    </div>
  );
}

export default ContractHistory;
