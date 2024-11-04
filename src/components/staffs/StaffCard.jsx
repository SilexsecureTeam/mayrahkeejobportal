import FormButton from "../FormButton";

function StaffCard({ data, onClick, contract = false }) {
  return (
    <div className="min-h-fit flex gap-1 flex-col justify-between p-2 border min-w-fit">
      <div className="flex flex-col  gap-2">
        <span className="flex items-center gap-2 text-md font-semibold">
          Name:
          <span className="text-sm font-normal text-gray-500">
            {data?.first_name} {data?.surname}
          </span>
        </span>

        <span className="flex gap-2 items-center text-md font-semibold">
          Age Range:
          <span className="text-sm font-normal text-gray-500">
            {data?.age} Years
          </span>
        </span>

        <span className="flex gap-2 items-center text-md font-semibold">
          Category:
          <span className="text-sm font-normal text-gray-500">
            {data?.subcategory}
          </span>
        </span>

        <span className="flex gap-2 items-center text-md truncate font-semibold">
          Education:
          <span className="text-sm font-normal text-gray-500">
            {data?.education_level}
          </span>
        </span>
      </div>

      <div className="w-full flex flex-col-reverse gap-2 mt-3">
        <FormButton onClick={() => onClick(data)} height="h-fit text-sm p-1">
          View More
        </FormButton>

        {contract && (
          <FormButton onClick={() => onClick(data)} height="h-fit bg-[#25324b] text-sm p-1">
            Sign
          </FormButton>
        )}
      </div>
    </div>
  );
}

export default StaffCard;
