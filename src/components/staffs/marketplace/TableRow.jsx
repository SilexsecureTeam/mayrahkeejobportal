import { useNavigate } from "react-router-dom";
import { resourceUrl } from "../../../services/axios-client";
import { FormatPrice } from "../../../utils/formmaters";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContex";

function TableRow({ data, isMarket = false, handleAddToCart }) {
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);

  const role = authDetails.user.role === "employer" ? "company" : "applicant";

  const navigateToStaff = () =>
    navigate(`/${role}/${data.staff_category}/${data.domestic_staff_id}`);

  const employmentType =
    !data?.employment_type ||
    data?.employment_type === "-- Select Employment Type --"
      ? "Nothing to display"
      : data?.employment_type;
  return (
    <tr className="border-b cursor-pointer hover:bg-gray-50 py-5 text-gray-700  text-little">
      <td className="text-center">
        <div className="flex justify-start  pl-5 py-3 font-semibold items-center gap-3">
          <img
            className="h-[50px] w-[50px] rounded-full"
            src={
              data.profile_image
                ? `${resourceUrl}/${data.profile_image}`
                : "/placeholder2.png"
            }
          />
          <span>
            {data?.first_name} {data?.surname}
          </span>
        </div>
      </td>

      <td>
        <div className="flex w-full py-[10px] justify-start items-center">
          <button className="py-[2px] px-4 text-little text-center font-semibold">
            {data?.subcategory}
          </button>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-start px-4 py-[10px] items-center">
          <span className="text-little font-semibold">{data?.email}</span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-start px-4 py-[10px] items-center">
          <span className="text-little font-semibold">{employmentType}</span>
        </div>
      </td>

      <td>
        <div className="flex w-full justify-start px-4 py-[10px] items-center">
          <button className="py-[2px] px-[5px] text-little  text-center font-semibold">
            {FormatPrice(2000)}
          </button>
        </div>
      </td>

      {!isMarket && (
        <td>
          <div className="flex w-full justify-start px-4 py-[10px] items-center">
            <span className="text-little font-semibold">{data.start_date}</span>
          </div>
        </td>
      )}
      <td>
        {isMarket ? (
          <button 
          onClick={() => handleAddToCart(data)}
          className="p-2 hover:underline text-primaryColor">
            Add to cart
          </button>
        ) : (
          <button
            onClick={navigateToStaff}
            className="p-2 hover:underline text-yellow-500"
          >
            View Details
          </button>
        )}
      </td>
    </tr>
  );
}

export default TableRow;
