function MultipleProgressBar({applicants, totalApplicants}) {

   const total = totalApplicants()

    return ( <div className="flex w-full h-[10px]">
            {
                applicants.map(current => {
                      const width = (current.applicants / total) * 100
                      console.log(width)
                    return <div style={{width: `${width}%`}} className={`${current.bg_color}  h-full`}/>
                })
            }
    </div> );
}

export default MultipleProgressBar;