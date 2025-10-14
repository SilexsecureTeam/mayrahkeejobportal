import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resourceUrl } from "../../../services/axios-client";
import { formatDate, FormatPrice } from "../../../utils/formmaters";
import { AuthContext } from "../../../context/AuthContex";
import { FaSpinner } from "react-icons/fa";

function TableRow({
  data,
  isMarket = false,
  handleAddToCart,
  handleRemoveCart,
  cartItems,
}) {
  const location = useLocation();
  const info = location?.state?.data;
  const navigate = useNavigate();
  const { authDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const role = authDetails.user.role === "employer" ? "company" : "applicant";

  const navigateToStaff = () =>
    navigate(`/${role}/${data.staff_category}/${data.domestic_staff_id}`);

  const employmentType =
    !data?.employment_type ||
    data?.employment_type === "-- Select Employment Type --"
      ? "Nil"
      : data?.employment_type;

  const handleCartAction = async () => {
    setLoading(true);
    const existingItem = cartItems?.find(
      (current) => data.id === current.domestic_staff_id
    );
    if (existingItem) {
      await handleRemoveCart(existingItem);
    } else {
      await handleAddToCart(data);
    }
    setLoading(false);
  };

  // 🔹 Normalize status text (case-insensitive)
  const normalizedStatus = data?.status?.toLowerCase?.() || "unknown";
  let statusText =
    normalizedStatus === "active"
      ? "Active"
      : normalizedStatus === "pending"
      ? "Pending"
      : normalizedStatus === "rejected"
      ? "Rejected"
      : normalizedStatus === "cancelled"
      ? "Cancelled"
      : "Unknown";

  // 🔹 Badge styles
  const statusStyles = {
    Active: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Cancelled: "bg-gray-100 text-gray-700",
    Unknown: "bg-gray-200 text-gray-500",
  };

  const dotColors = {
    Active: "bg-green-600",
    Pending: "bg-yellow-600",
    Rejected: "bg-red-600",
    Cancelled: "bg-gray-600",
    Unknown: "bg-gray-400",
  };

  const style = statusStyles[statusText] || statusStyles.Unknown;
  const dotColor = dotColors[statusText] || dotColors.Unknown;

  return (
    <tr className="border-b cursor-pointer hover:bg-gray-50 text-gray-700 text-sm">
      {/* Profile Image and Name */}
      <td className="text-left py-3 px-2">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={
              data.profile_image
                ? `${resourceUrl}/${data.profile_image}`
                : "/placeholder2.png"
            }
            alt="Profile"
          />
          <span className="truncate">
            {data?.first_name} {data?.surname}
          </span>
        </div>
      </td>

      {/* Subcategory */}
      <td className="text-left py-3 px-2">
        <span className="truncate">{data?.subcategory}</span>
      </td>

      {/* Email */}
      <td className="text-left py-3 px-2">
        <span className="truncate">{data?.email}</span>
      </td>

      {/* Employment Type */}
      {info?.type !== "artisan" && (
        <td className="text-left py-3 px-2">
          <span className="truncate">{employmentType}</span>
        </td>
      )}

      {/* Price */}
      {data?.staff_category !== "artisan" && (
        <td className="text-left py-3 px-2">
          <span className="break-all">
            {Number(data?.salary_agreed) > 0 ? (
              FormatPrice(
                Number(data?.salary_agreed) + Number(data?.markup_fee || 0)
              )
            ) : (
              <span className="text-red-500 font-medium">Salary not set</span>
            )}
          </span>
        </td>
      )}

      {/* Start Date */}
      {!isMarket && info?.type !== "artisan" && (
        <td className="text-left py-3 px-2">
          <span className="truncate">
            {data?.start_date ? formatDate(data?.start_date) : "Not set"}
          </span>
        </td>
      )}

      {/* Status Badge */}
      {!isMarket && (
        <td className="text-left py-3 px-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style}`}
          >
            <span className={`w-2 h-2 mr-2 rounded-full ${dotColor}`}></span>
            {statusText}
          </span>
        </td>
      )}

      {/* Actions */}
      {isMarket ? (
        <td className="text-left py-3 px-2">
          <span
            onClick={handleCartAction}
            className="w-full text-primaryColor hover:underline"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : cartItems?.find(
                (current) => data.id === current.domestic_staff_id
              ) ? (
              "Remove from Cart"
            ) : (
              "Add to Cart"
            )}
          </span>
        </td>
      ) : (
        <td className="text-left py-3 px-2">
          <button
            onClick={navigateToStaff}
            className="w-full text-primaryColor hover:underline"
          >
            View Profile
          </button>
        </td>
      )}
    </tr>
  );
}

export default TableRow;
