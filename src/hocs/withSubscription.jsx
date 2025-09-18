import { useContext, useState } from "react";
import { FaSpinner, FaArrowUp, FaStar, FaGift } from "react-icons/fa";
import { SubscriptionContext } from "../context/SubscriptionContext";
import { AuthContext } from "../context/AuthContex";
import SubscriptionModal from "../components/subscription/SubscriptionModal";

function withSubscription(Component, title) {
  const subUtils = useContext(SubscriptionContext);
  const { authDetails } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activePackage = subUtils?.activePackage;
  const currentPackage = activePackage
    ? subUtils?.packages?.find((pkg) => pkg.id === activePackage.package_id)
    : {};

  const hasPermission =
    authDetails?.user?.user_type === "exclusive" ||
    (title?.toLowerCase() === "job" && currentPackage?.number_of_jobs > 0) ||
    (title?.toLowerCase() === "candidate" &&
      currentPackage?.number_of_candidates > 0) ||
    (title?.toLowerCase() === "message" &&
      ["Mayrahkee Premium", "Mayrahkee Plus"].includes(currentPackage?.title));

  if (hasPermission) return <Component />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-50 via-white to-green-50 px-4">
      {!subUtils?.loading ? (
        <div className="bg-white shadow-2xl rounded-2xl max-w-lg w-full p-8 text-center relative overflow-hidden">
          {/* Floating icons for graphics */}
          <FaGift className="absolute -top-6 -left-6 text-green-200 text-4xl animate-bounce opacity-40" />
          <FaStar className="absolute -bottom-6 -right-6 text-yellow-300 text-5xl animate-pulse opacity-30" />

          <div className="mb-6 flex justify-center">
            <FaStar size={48} className="text-green-500 animate-pulse" />
          </div>

          <h3 className="text-3xl font-extrabold text-green-700 mb-4">
            {subUtils?.activePackage
              ? "Upgrade Required"
              : "Subscription Needed"}
          </h3>

          <p className="text-gray-700 text-md mb-8 leading-relaxed">
            {subUtils?.activePackage
              ? "You do not have the required permissions to access this feature. Upgrade your subscription to unlock this package and enjoy all the benefits."
              : "Subscribe to a package to access this feature and enjoy tailored tools designed for your success."}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 flex items-center gap-2 justify-center text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              <FaArrowUp />{" "}
              {subUtils?.activePackage
                ? "Upgrade Subscription"
                : "Subscribe Now"}
            </button>
            {subUtils?.activePackage && (
              <button
                onClick={() => window.history.back()}
                className="bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner size={40} className="animate-spin text-green-600 mb-4" />
          <span className="text-gray-500 text-lg text-center">
            Checking subscription status, please wait...
          </span>
        </div>
      )}

      {/* Subscription Modal */}
      <SubscriptionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}

export default withSubscription;
