import { FormatPrice } from "../../utils/formmaters";
import Spinner from "../Spinner";
import { PaystackConsumer } from "react-paystack";

function SubscriptionCard({ data, subUtils, setIsOpen }) {
  const handleOnClick = (reference, data) => {
    console.log('Triggered')
    subUtils.makePaymentCheck(reference, data);
    if(setIsOpen){
      setIsOpen(false)
    }
  };

  return (
    <li className="w-[30%] duration-75 odd:hover:scale-105 even:hover:scale-110 cursor-pointer rounded-[10px] group has-[h3]:border-[2px] even:mt-[-10px] even:scale-105  flex flex-col items-center justify-between  px-2 py-4 h-[90%] even:border even:bg-primaryColor even:text-white odd:text-primaryColor odd:border-primaryColor">
      <div className="flex flex-col items-center h-full">
        <h3 className="font-semibold group-odd:border-primaryColor text-center group-even:border-white w-[60%] rounded-[5px] py-1 border text-md">
          {data.title}
        </h3>
        <span className="font-semibold mt-[10%] text-xl">
          {FormatPrice(Number(data.price))}
        </span>
        <span className="mt-[3%] text-little">user/month</span>
        <p className="mt-[10%] text-little text-center w-[90%] ">
          {data.description}
        </p>
      </div>
      <PaystackConsumer {...subUtils.config(data, handleOnClick)}>
        {({ initializePayment }) => (
          <button
            onClick={initializePayment}
            className={`text-little ${
              !true
                ? "hover:text-[13px] hover:scale-105 duration-75"
                : "hover:text-little hover:scale-100 duration-75"
            } relative h-[30px] w-[60%] font-semibold group-odd:bg-primaryColor group-odd:text-white group-even:bg-white group-even:text-primaryColor rounded-md`}
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
