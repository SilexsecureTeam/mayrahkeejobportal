import { useContext, useEffect, useState } from "react";
import SubscriptionPlans from "../../pages/SubscriptionPlans";
import useSubscription from "../../hooks/useSubscription";
import { MdClose } from "react-icons/md";
import { SubscriptionContext } from "../../context/SubscriptionContext";

function SubscriptionPackages() {
  // const [isOpen, setIsOpen] = useState(false);
  const subUtils = useContext(SubscriptionContext);


  return (
    (
      <div className="h-full z-50 w-full text-gray-400 text-little flex justify-center items-center">
        <div className="w-full h-[95%] p-4 flex flex-col rounded-[10px]  bg-white border">
          <SubscriptionPlans
            packages={subUtils.packages}
            
          />
        </div>{" "}
      </div>
    )
  );
}

export default SubscriptionPackages;
