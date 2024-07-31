import DescriptionItem from "./DescriptionItem";


const descriptions = [
    {
        id: 1,
        title: 'Job Description',
        desc: 'Job titles must be describe one position',
        placeholder: 'Enter a job decription'
    },
    {
        id: 2,
        title: 'Responsibilities',
        desc: 'Outline the core responsibilities of the position',
        placeholder: 'Begin to type...'
    },
    {
        id: 3,
        title: 'Who you are',
        desc: 'Add your preferred candidates qualifications',
        placeholder: 'Begin to type...'
    },
    {
        id: 5,
        title: 'Nice-to-haves',
        desc: 'Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply',
        placeholder: 'Begin to type...'
    },
]

function Descriptions({data, setCurrentStep}) {
  return (
    <div className="flex w-full flex-col p-2">
      {/* Descriptions */}
      <div className="flex flex-col gap-[15px] border-b pb-2">
        <h3 className="text-gray-700 text-sm font-semibold">Details</h3>
        <span className="text-little text-gray-400">
          Add the description of the job, responsibilities, who you are, and
          nice-to-haves.{" "}
        </span>
      </div>

       {/* Job Description */}
       <>
        {descriptions.map((current, index) => <DescriptionItem key={index} data={current}/>)}
       </>

       <button onClick={() => setCurrentStep(data[2])} className="p-2 place-self-end mt-[10px] font-semibold w-fit text-little bg-primaryColor text-white">Next Step</button>

    </div>
  );
}

export default Descriptions;
