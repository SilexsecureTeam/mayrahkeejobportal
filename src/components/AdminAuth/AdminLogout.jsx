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
      
      if (response === 201 || response === 200) {
        localStorage.removeItem("__auth_details");
        toast.success("Logout successful!");
          navigate("/admin/login");
      } else {
          toast.error("An error occurred during logout");
          navigate("/admin/");
          console.log(response.err);
          
      }
    })();
  }, []);

  return null;
}

export default AdminLogout;
