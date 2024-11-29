const Experience=()=>{

    return(
        <div className="flex flex-col md:flex-row md:items-center gap-y-4 min-h-40 p-4 md:p-8">
            {/* Left */}
            <section className="w-full capitalize flex-1 md:w-1/2 flex flex-col gap-3">
                <p className="text-gray-500 text-xl">Join connect today</p>
                <h2 className="text-4xl md:max-w-18 font-semibold">Experience With Number</h2>

            </section>
            {/* Right */}
            <section className="w-full md:w-1/2 flex gap-3 justify-between my-2 md:my-0">
                <div className="flex flex-col gap-3">
                    <p className="text-3xl font-semibold text-green-600">92%</p>
                    <p className="text-xs text-gray-600">Many users find relevant jobs according to skills</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-3xl font-semibold text-green-600">92%</p>
                    <p className="text-xs text-gray-600">Many users find relevant jobs according to skills</p>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-3xl font-semibold text-green-600">92%</p>
                    <p className="text-xs text-gray-600">Many users find relevant jobs according to skills</p>
                </div>
            </section>
            
        </div>
    )
}
export default Experience;