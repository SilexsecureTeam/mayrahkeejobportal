import { useState } from "react";
import { FormatPrice } from "../../utils/formmaters";
import Spinner from "../Spinner";
import { PaystackConsumer } from "react-paystack";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function SubscriptionCard({ data, subUtils, setIsOpen }) {
  const [showPerks, setShowPerks] = useState(false);

  const handleOnClick = (reference, data) => {
    console.log("Triggered");
    subUtils.makePaymentCheck(reference, data);
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <li className="w-[25%] duration-75 hover:scale-105 cursor-pointer rounded-[10px] group has-[h3]:border-[2px]  flex flex-col items-center justify-between  px-2 py-2 h-[90%] even:border even:bg-primaryColor even:text-white odd:text-primaryColor odd:border-primaryColor">
      <div className="flex flex-col items-center h-full">
        <h3 className="font-semibold group-odd:border-primaryColor text-center group-even:border-white w-[60%] rounded-[5px] py-1 border text-md">
          {data.title}
        </h3>
        <span className="font-semibold mt-[10%] text-xl flex gap-2">
          {FormatPrice(Number(data.price))}
          <button
          onClick={() => setShowPerks(!showPerks)} 
          className="flex text-sm border items-center rounded-md px-2">
            {!showPerks ? "Perks" : "Desc"}
          </button>
        </span>
        {!showPerks ? (
          <>
            <span className="mt-[3%] text-little">user/month</span>
            <p className="mt-[10%] text-little text-center w-[90%] ">
              {data.description}
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col px-2 h-[80%] text-[12px] items-start justify-center">
              {data.permissions.map((current) => (
                <div className="flex gap-2 font-semibold text-lig items-center w-full">
                  <IoMdCheckmarkCircleOutline className="text-md" />
                  <span className="w-[90%]">{current}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <PaystackConsumer {...subUtils.config(data, handleOnClick)}>
        {({ initializePayment }) => (
          <button
            onClick={initializePayment}
            className={`text-sm ${
              !true
                ? "hover:text-[13px] hover:scale-105 duration-75"
                : "hover:text-little hover:scale-100 duration-75"
            } relative h-[35px] w-[80%] font-semibold group-odd:bg-primaryColor group-odd:text-white group-even:bg-white group-even:text-primaryColor rounded-md`}
          >
            Choose Plan
            {subUtils.loading && <Spinner />}
          </button>
        )}
      </PaystackConsumer>
    </li>
  );
}

export default SubscriptionCard;
