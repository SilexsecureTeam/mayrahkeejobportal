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
      
      if (response === 201) {
        localStorage.removeItem("__auth_details");
        toast.success("Logout successful!");
        setTimeout(() => {
          // navigate("/admin/login");
        }, 2000);
        // navigate("/admin/login");
      } else {
          toast.error("An error occurred during logout");
          setTimeout(() => {
            // navigate("/admin/");
          }, 2000);
          // navigate("/admin/");
      }
    })();
  }, []);

  return null;
}

export default AdminLogout;
