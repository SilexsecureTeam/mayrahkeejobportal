function SummaryCard({title, description, value}) {
    return ( <div className=" rounded-md border cursor-pointer hover:scale-[102%] flex flex-col justify-between gap-5 p-3">
        
           <span className="text-green-700 text-md">{title}</span>

           <span className="text-gray-700 text-md">{description}</span>

           <span className="text-black text-2xl font-semibold">{value}</span>
    
    </div> );
}

export default SummaryCard;