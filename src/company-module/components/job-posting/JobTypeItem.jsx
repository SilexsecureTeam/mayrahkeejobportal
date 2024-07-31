import { useState } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

function JobTypeItem({data}) {
  const [selected, setSelected] = useState(false);

   const toogleCheckBox = () => setSelected(!selected)

  return (
    <div className="flex items-center text-gray-400 text-little gap-[10px]">
      {selected ? (
        <MdOutlineCheckBox onClick={toogleCheckBox} className="text-primaryColor cursor-pointer text-sm" />
      ) : (
        <MdOutlineCheckBoxOutlineBlank onClick={toogleCheckBox} className=" text-sm cursor-pointer" />
      )}
      <span>{data}</span>
    </div>
  );
}

export default JobTypeItem;
