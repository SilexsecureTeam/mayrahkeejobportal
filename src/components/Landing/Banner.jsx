const Banner=({title, desc})=>{

    return(
        <div className="flex flex-col justify-center items-center text-center p-4 py-10 min-h-28 my-3">
            <h2 className="text-2xl capitalize font-bold my-3 max-w-[550px]">{title}</h2>
            <p className="text-gray-500 text-sm font-medium max-w-md">{desc}</p>
        </div>
    )
}

export default Banner;