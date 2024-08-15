import { useContext, useEffect, useState } from "react";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import useSubscription from "../hooks/useSubscription";
import Spinner from "../components/Spinner";
import FallbackComponent from "../components/Fallback";
import { SubscriptionContext } from "../context/SubscriptionContext";

function withSubscription(Component, title) {
  const subUtils = useContext(SubscriptionContext)

  // useEffect(() => {
  //   if (hasSubscribed) {
  //     console.log("toohled");
  //   }
  // }, [hasSubscribed]);

  return (
    <>
      {!subUtils.loading && subUtils.activePackage && <Component />}

      {!subUtils.loading && !subUtils.activePackage && (
        <SubscriptionPlans
          subUtils={subUtils}
        />
      )}

      {subUtils.loading && !subUtils.activePackage && (
        <div className="h-full w-full flex items-center justify-center">
             <span className="text-little font-semibold text-gray-400">Making some checks, please wait...</span>
        </div>
      )}
    </>
  );
}

export default withSubscription;
