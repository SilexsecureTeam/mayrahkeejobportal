import { useContext, useEffect, useState } from "react";
import SubscriptionPlans from "../../pages/SubscriptionPlans";
import useSubscription from "../../hooks/useSubscription";
import { MdClose } from "react-icons/md";
import { SubscriptionContext } from "../../context/SubscriptionContext";

function SubscriptionModal({ redirectState }) {
  const [isOpen, setIsOpen] = useState(false);
  const subUtils = useContext(SubscriptionContext);

  useEffect(() => {
    // setInterval(() => {
    //   subUtils.getActivePackage();
    //   if (!redirectState && !subUtils.activePackage) {
    //     console.log(subUtils.activePackage);
    //     setIsOpen(true);
    //   }
    // }, 90000);

    return () => {
      clearInterval();
      clearTimeout();
    };
  }, []);

  useEffect(() => {
    clearTimeout();
    setTimeout(() => {
      if (!redirectState && !subUtils.activePackage) {
        setIsOpen(true);
      }
    }, 5000);
  }, []);

  return (
    isOpen && (
      <div className="h-full z-50 w-full text-gray-400 text-little flex justify-center items-center bg-gray-600/70 fixed top-0 left-0">
        <div className="w-[90%] h-[95%] p-2 flex flex-col  rounded-[10px]  bg-white border">
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center place-self-end justify-center rounded-[5px] gap-[5px] w-fit border px-2 py-1"
          >
            Close
            <MdClose className=" mt-[2px] text-gray-500" />
          </button>
          <SubscriptionPlans subUtils={subUtils} setIsOpen={setIsOpen} />
        </div>{" "}
      </div>
    )
  );
}

export default SubscriptionModal;
