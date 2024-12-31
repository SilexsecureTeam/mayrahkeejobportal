function MultipleProgressBar({ applicants, totalApplicants }) {
 
  return (
    <div className="flex w-full h-[10px]">
      {applicants && Object.keys(applicants).map((current) => {
        const width = (applicants[current].length / totalApplicants) * 100;
        return (
          <div
          key={current?.id}
            style={{ width: `${width}%` }}
            className={` list-item h-full`}
          />
        );
      })}
    </div>
  );
}

export default MultipleProgressBar;
