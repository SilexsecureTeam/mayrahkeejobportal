import DataItem from "./DataItem";

function StaffLists({data}) {
    return ( <div>
         <table className="min-w-full bg-white border border-gray-200">
          <thead className="border bg-white  text-gray-600 font-semibold ">
            <tr className=" text-little  divide-gray-200 ">
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Category</th>
              <th className="px-4 py-2 text-center">Age</th>
              <th className="px-4 py-2 text-center">Location</th>
            </tr>
          </thead>

          <tbody>
            {
              data.map( current => {
              return <DataItem data={current} key={current.id}/>}).reverse()
            }
          </tbody>
        </table>
    </div> );
}

export default StaffLists;