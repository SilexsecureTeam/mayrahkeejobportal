import { useContext } from "react";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import { FaSpinner } from "react-icons/fa";
import { SubscriptionContext } from "../context/SubscriptionContext";
import { AuthContext } from "../context/AuthContex";

function withSubscription(Component, title) {
  return function WrappedComponent(props) {
    const subUtils = useContext(SubscriptionContext);
    const { authDetails } = useContext(AuthContext);
    
    const activePackage = subUtils?.activePackage;
    const currentPackage = activePackage
      ? subUtils?.packages?.find((pkg) => pkg.id === activePackage.package_id)
      : {};

    const hasPermission =
      authDetails?.user?.user_type === "exclusive" || // Always true for "exclusive" users
      (title?.toLowerCase() === "job" && currentPackage?.number_of_jobs > 0) ||
      (title?.toLowerCase() === "candidate" &&
        currentPackage?.number_of_candidates > 0) ||
      (title?.toLowerCase() === "message" &&
        ["Mayrahkee Premium", "Mayrahkee Plus"].includes(currentPackage?.title));

    if (hasPermission) {
      return <Component {...props} />;
    }

    return (
      <div className="h-full flex pt-10 justify-center bg-gray-50">
        {!subUtils?.loading && subUtils?.activePackage ? (
          <div className="h-max w-full bg-white rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-700">
              Subscription Upgrade
            </h3>
            <p className="text-gray-600 font-bold mb-6">
              You do not have the required permissions to access this feature. 
              Please upgrade your subscription.
            </p>
          </div>
        ) : !subUtils?.loading && !subUtils?.activePackage ? (
          <div className="h-max w-full bg-white rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-700">
              Subscription Required
            </h3>
            <p className="text-gray-600 font-bold mb-6">
              Please subscribe to a package to access this feature.
            </p>
            {/* <SubscriptionPlans subUtils={subUtils} /> */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <FaSpinner size="24" className="animate-spin" />
            <span className="mt-4 text-xl md:text-lg font-medium text-gray-500 text-center">
              Checking subscription status, please wait...
            </span>
          </div>
        )}
      </div>
    );
  };
}

export default withSubscription;
