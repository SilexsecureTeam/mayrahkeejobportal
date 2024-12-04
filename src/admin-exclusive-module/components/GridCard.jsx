

function GridCard({ data }) {

  return (
    <div className="flex flex-col rounded-md items-center border border-gray-400 p-5 gap-3">
      <span className="font-semibold">Something</span>

      <div className="flex w-full justify-between px-3">
        <span className="text-gray-600 font-semibold">Full Name</span>
        <span>test</span>
      </div>

      <div className="flex w-full justify-between px-3">
        <span className="text-gray-600 font-semibold">Email</span>
        <span>Test</span>
      </div>

      <div className="flex w-full justify-between px-3">
        <span className="text-gray-600 font-semibold">Phone</span>
        <span>test</span>
      </div>

      <div className="flex w-full items-center justify-between px-3">
        <span className="text-gray-600 font-semibold">Status</span>
        <span>test</span>
      </div>

      <div className="flex w-full items-center justify-between px-3">
        <span className="text-gray-600 font-semibold">Action</span>
        <span  className="hover:underline hover:text-primaryColor cursor-pointer">
          View Application
        </span>
      </div>
    </div>
  );
}

export default GridCard;
