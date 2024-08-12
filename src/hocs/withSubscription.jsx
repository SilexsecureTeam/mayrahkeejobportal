import { useState } from "react";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import useSubscription from "../hooks/useSubscription";

function withSubscription(Component, title) {
  const [hasSubscribed, setHasSuscribed] = useState(true);

  return hasSubscribed ? <Component /> : <SubscriptionPlans />;
}

export default withSubscription;
