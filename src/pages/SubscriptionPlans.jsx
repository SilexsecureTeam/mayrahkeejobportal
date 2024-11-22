import SubscriptionCard from "../components/subscription/SubscriptionCard";

function SubscriptionPlans({ packages, setIsOpen }) {
  const style = packages.length > 4 ? 'md:grid-cols-4 w-[95%]' : `md:grid-cols-2 w-[60%]` 
  return (
    <div className="h-full w-full justify-start gap-10 items-center bg-white flex flex-col">
      <h2 className="font-semibold text-black text-3xl">Choose a plan</h2>

      <p className="w-[40%] p-2 text-center font-semibold text-white bg-primaryColor/50">
        Monthly Plan
      </p>
      <p className="w-[40%] p-2 text-center font-semibold text-primaryColor">
        Best Subscription plans for Mayraykee
      </p>

      <ul className={`max-h-96 grid grid-cols-1 ${style} gap-5 mt-20 overflow-y-auto`}>
        {packages?.map((current) => (
          <SubscriptionCard
            setIsOpen={setIsOpen}
            key={current.id}
            data={current}
          />
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionPlans;
