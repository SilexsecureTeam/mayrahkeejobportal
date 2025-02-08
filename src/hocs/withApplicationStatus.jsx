import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import { FaSpinner } from "react-icons/fa";

function withApplicationStatus(Component) {
    const { authDetails } = useContext(AuthContext);
  console.log("hey",authDetails?.user)
    // if (loading) {
    //   return (
    //     <div className="flex flex-col items-center justify-center h-full">
    //       <FaSpinner size="24" className="animate-spin text-gray-500" />
    //       <span className="mt-4 text-xl md:text-lg font-medium text-gray-500 text-center">
    //         Checking application status, please wait...
    //       </span>
    //     </div>
    //   );
    // }
    const status = authDetails?.user?.status?.toLowerCase();

    if (!status) {
      return (
        <div className="h-max w-full flex flex-col items-center bg-white rounded-lg p-6 text-center">
          <h3 className="text-2xl max-w-[600px] font-bold mb-4 text-red-600">
            Application Status Unknown
          </h3>
          <p className="text-gray-600 max-w-[600px] font-bold mb-6">
            We could not determine your application status. Please contact support.
          </p>
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className="h-max w-full flex flex-col items-center bg-white rounded-lg p-6 text-center">
          <h3 className="text-2xl max-w-[600px] font-bold mb-4 text-yellow-600">
            Application Pending
          </h3>
          <p className="text-gray-600 max-w-[600px] font-bold mb-6">
            Your application is pending approval. Please update your profile and check back later.
          </p>
        </div>
      );
    }

    if (status === "approved") {
      return <Component />;
    }

    if (status === "rejected") {
      return (
        <div className="h-max w-full flex flex-col items-center bg-white rounded-lg p-6 text-center">
          <h3 className="text-2xl max-w-[600px] font-bold mb-4 text-red-700">
            Application Rejected
          </h3>
          <p className="text-gray-600 max-w-[600px] font-bold mb-6">
            Your application has been rejected. Please contact support for more details.
          </p>
        </div>
      );
    }

    if (status === "suspended") {
      return (
        <div className="h-max w-full flex flex-col items-center bg-white rounded-lg p-6 text-center">
          <h3 className="text-2xl max-w-[600px] font-bold mb-4 text-orange-700">
            Account Suspended
          </h3>
          <p className="text-gray-600 max-w-[600px] font-bold mb-6">
            Your account has been suspended due to policy violations. Contact support for assistance.
          </p>
        </div>
      );
    }

    return (
      <div className="h-max w-full flex flex-col items-center bg-white rounded-lg p-6 text-center">
        <h3 className="text-2xl max-w-[600px] font-bold mb-4 text-gray-700">
          Unknown Status
        </h3>
        <p className="text-gray-600 max-w-[600px] font-bold mb-6">
          We couldn't process your application status. Please contact support.
        </p>
      </div>
    );

}

export default withApplicationStatus;
