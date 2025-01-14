import { useContext } from "react";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import Spinner from "../components/Spinner";
import { SubscriptionContext } from "../context/SubscriptionContext";
import { AuthContext } from "../context/AuthContex";

function withSubscription(Component, title) {
  const subUtils = useContext(SubscriptionContext);
  const { authDetails } = useContext(AuthContext);

  return (
    authDetails?.user?.user_type === "exclusive" ? (
      <Component />
    ) : (
      <div className="min-h-screen flex justify-center bg-gray-50 px-4">
        {!subUtils?.loading && subUtils?.activePackage ? (
          <Component />
        ) : !subUtils?.loading && !subUtils?.activePackage ? (
          <div className="max-w-md h-max w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-green-700">
              Subscription Required
            </h3>
            <p className="text-gray-600 mb-6">
              Please subscribe to a package to access this feature. Enjoy exclusive benefits and tailored features designed for you!
            </p>
            {/*<SubscriptionPlans subUtils={subUtils} />*/}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Spinner />
            <span className="mt-4 text-lg font-medium text-gray-500">
              Checking subscription status, please wait...
            </span>
          </div>
        )}
      </div>
    )
  );
}

export default withSubscription;
