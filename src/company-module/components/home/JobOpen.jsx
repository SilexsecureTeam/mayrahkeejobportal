function JobOpen() {
    return ( <div className="w-full h-[30%] justify-between px-3 py-[3px] flex flex-col border">
       <h3 className="font-semibold text-gray-700">Jobs open</h3>
       
       <div className="flex gap-[10px] items-end">
         <span className="font-semibold text-4xl">0</span>
         <span className="text-md">Jobs opened</span>
       </div>
    </div> );
}

export default JobOpen;