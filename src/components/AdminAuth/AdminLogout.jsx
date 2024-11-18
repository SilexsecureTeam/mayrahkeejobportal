import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAdminManagement from "../../hooks/useAdminManagement";
import { toast } from "react-toastify";

function AdminLogout() {
  const { AdminLogout } = UseAdminManagement();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await AdminLogout();
      console.log("Response:", response);
      
      if (response === 200) {
        toast.success("Logout successful!");
        navigate("/login");
        localStorage.removeItem("__auth_details");
      } else {
          toast.error("An error occurred during logout");
          navigate("/admin/");
      }
    })();
  }, [AdminLogout, navigate]);

  return null;
}

export default AdminLogout;
