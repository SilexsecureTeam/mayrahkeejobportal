import { useContext, useState } from "react";
import { FormatPrice } from "../../utils/formmaters";
import Spinner from "../Spinner";
import { PaystackConsumer } from "react-paystack";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SubscriptionContext } from "../../context/SubscriptionContext";
import { IoGift } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SubscriptionCard({ data, setIsOpen, currentPackage }) {
  const [showPerks, setShowPerks] = useState(currentPackage?.package_id === data?.id);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const subUtils = useContext(SubscriptionContext);
  const navigate = useNavigate();

  const handleOnClick = (reference, data) => {
    subUtils?.makePaymentCheck(reference, data);
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const handlePayment = (initializePayment) => {
    initializePayment();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
    } else {
      setQuantity(Math.max(1, Number(value)));
    }
  };

  return (
    <li className="group relative duration-75 rounded-[10px] group flex flex-col items-center justify-between p-3 border even:border even:bg-primaryColor even:text-white odd:text-primaryColor odd:border-primaryColor">
      {currentPackage?.package_id === data.id && (
        <IoGift size="50" className="absolute top-[-10px] left-0 right-0 mx-auto animate-bounce z-10" />
      )}

      <div className="flex flex-col items-center h-96 overflow-y-auto">
        <h3 className="sticky top-0 font-semibold group-odd:bg-white group-odd:border-primaryColor text-center group-even:bg-primaryColor group-even:border-white w-[60%] rounded-[5px] py-1 border text-md">
          {data.title}
        </h3>

        <span className="font-semibold mt-[10%] text-xl flex gap-2 items-center">
          {data?.title?.toLowerCase().includes("exclusive")
            ? "Contract"
            : `₦ ${FormatPrice(Number(data.price) * quantity)}`}
          <button
            onClick={() => setShowPerks(!showPerks)}
            className="text-sm border odd:border-primaryColor rounded-md px-2 py-1 transition-all hover:bg-primaryColor hover:text-white"
          >
            {showPerks ? "Desc" : "Perks"}
          </button>
        </span>

        {!data?.title?.toLowerCase().includes("exclusive") && (
          <div className="mt-3 text-center">
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="font-medium w-20 text-center border-2 group-even:border-white group-odd:border-primaryColor bg-transparent rounded-md py-1 px-2"
            />
          </div>
        )}

        <article className="font-medium flex flex-col items-center my-2">
          <p>Jobs per subscription: {data?.number_of_jobs || 0}</p>
          {currentPackage?.package_id === data.id && (
            <p>Jobs Remaining: {currentPackage?.available_jobs}</p>
          )}
          <p>
            Duration: {data?.duration} {data?.duration > 1 ? "days" : "day"}
          </p>
        </article>

        {!showPerks ? (
          <p className="my-5 text-little text-center w-[90%]">{data.description}</p>
        ) : (
          <div className="flex flex-col gap-2 p-2 text-[12px] items-start">
            {data?.permissions?.map((current, index) => (
              <div key={index} className="flex gap-2 font-bold text-sm w-full">
                <IoMdCheckmarkCircleOutline size="18" className="flex-shrink-0 text-green-500" />
                <span>{current}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {data?.title?.toLowerCase().includes("exclusive") ? (
        <button
          onClick={() => navigate("/company/help-center")}
          className="text-sm font-semibold w-[80%] h-[35px] rounded-md transition-all group-odd:bg-primaryColor group-odd:text-white group-even:bg-white group-even:text-primaryColor hover:scale-105 disabled:opacity-60"
          disabled={(currentPackage && currentPackage?.package_id !== data.id)}
        >
          Contact Mayrahkee Support
        </button>
      ) : (
        <PaystackConsumer
          {...subUtils?.config(
            { ...data, price: Number(data.price) * quantity, quantity: quantity },
            handleOnClick
          )}
        >
          {({ initializePayment }) => (
            <>
              <button
                disabled={subUtils?.loading || (currentPackage && currentPackage?.package_id !== data.id && Number(currentPackage?.available_jobs) > 0)}
                onClick={() => setShowModal(true)}
                className="text-sm font-semibold w-[80%] h-[35px] rounded-md transition-all group-odd:bg-primaryColor group-odd:text-white group-even:bg-white group-even:text-primaryColor hover:scale-105 disabled:opacity-60"
              >
                {subUtils?.loading ? "Processing..." : "Choose Plan"}
              </button>

              {/* Modal for Subscription Guidelines */}
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-black">
                    <h2 className="text-2xl font-bold mb-4">Subscription Guidelines</h2>
                    <ul className="text-sm list-disc space-y-2 px-4 text-gray-700">
                      <li>Package upgrades are not available.</li>
                      <li>You can make payments for multiple job postings under a single package.</li>
                      <li>All job postings must be utilized before subscribing to a different package.</li>
                    </ul>
                    <div className="mt-4 flex items-center gap-2 *:cursor-pointer">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <label htmlFor="agree" className="text-sm">
                        I agree to the terms above
                      </label>
                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setShowModal(false);
                          setAgreed(false);
                        }}
                        className="px-3 py-1 rounded-md border text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!agreed}
                        onClick={() => {
                          setShowModal(false);
                          setAgreed(false);
                          handlePayment(initializePayment);
                        }}
                        className="px-3 py-1 bg-primaryColor text-white rounded-md text-sm disabled:opacity-50"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </PaystackConsumer>
      )}

      {subUtils?.loading && <Spinner />}
    </li>
  );
}

export default SubscriptionCard;
