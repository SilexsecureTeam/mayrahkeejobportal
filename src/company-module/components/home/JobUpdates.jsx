import JobItem from "./JobItem";

function JobUpdates({jobs}) {
  return (
    <div className="w-full h-[250px] border flex flex-col items-center">
      <div className="h-[15%] text-sm w-full font-semibold p-2 flex items-center border-b">
        <h3>Jobs Updates</h3>
      </div>
      <ul className="flex p-2 h-[85%] gap-[15px] max-w-[98%] overflow-x-auto">
        {jobs.map(current => <JobItem data={current} key={current.id}/>)}
      </ul>
    </div>
  );
}

export default JobUpdates;
