import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function DescriptionItem({ data, jobUtils }) {
  const [content, setContent] = useState(data.placeholder);
  return (
    <div className="flex gap-[15%] border-b min-h-[170px] py-2 ">
      <div className="flex flex-col min-w-[25%] max-w-[25%] gap-[10px]">
        <h3 className="text-gray-700 text-sm font-semibold">{data.title}</h3>
        <span className="text-little text-gray-400">{data.desc}</span>
      </div>

      <div className="flex flex-col gap-[3px] w-[60%]  text-gray-400 justify-between ">
        <div className="h-[90%]">
        <ReactQuill
          placeholder={data.placeholder}
          value={jobUtils.details[data.name]}
          onChange={(text) => {
            jobUtils.setDetails({...jobUtils.details, [data.name]: text})
          }}
        />
        </div>

        <span className="text-[10px] text-gray-400">
          Maximum of 500 characters
        </span>
      </div>
    </div>
  );
}

export default DescriptionItem;
