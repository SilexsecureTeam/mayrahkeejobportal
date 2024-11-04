import { createContext } from "react";
import useSubscription from "../hooks/useSubscription";

export const SubscriptionContext = createContext();

export const SubscriptionContextProvider = ({ children }) => {
  const {
    loading,
    packages,
    activePackage,
    config,
    makePaymentCheck,
    getActivePackage,
  } = useSubscription();


  return (
    <SubscriptionContext.Provider
      value={{
        loading,
        packages,
        activePackage,
        config,
        makePaymentCheck,
        getActivePackage,
      }}
    >


      
      {children}
    </SubscriptionContext.Provider>
  );
};
