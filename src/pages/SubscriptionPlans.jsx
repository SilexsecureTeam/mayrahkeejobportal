import SubscriptionCard from "../components/subscription/SubscriptionCard";

function SubscriptionPlans({ subUtils, setIsOpen }) {
  return (
    <div className="h-full w-full justify-between items-center bg-white flex flex-col">
      <h2 className="font-semibold text-black text-3xl">Choose a plan</h2>

      <p className="w-[40%] p-2 text-center font-semibold text-white bg-primaryColor/50">
        Monthly Plan
      </p>
      <p className="w-[40%] p-2 text-center font-semibold text-primaryColor">
        Best Subscription plans for Mayraykee
      </p>

      <ul className="max-h-96 grid grid-cols-1 md:grid-cols-responsive2 items-stretch gap-5 w-[95%] mt-[3%] overflow-y-auto">
        {subUtils?.packages?.map((current) => (
          <SubscriptionCard
            setIsOpen={setIsOpen}
            subUtils={subUtils}
            key={current.id}
            data={current}
          />
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionPlans;
