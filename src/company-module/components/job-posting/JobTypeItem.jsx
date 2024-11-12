import { useState } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

function JobTypeItem({data,  selectedType, toogleSelectedType}) {
  

  return (
    <div className="flex items-center text-gray-400 text-little gap-[10px]">
      {data?.id === selectedType?.id ? (
        <MdOutlineCheckBox onClick={() => toogleSelectedType({})} className="text-primaryColor cursor-pointer text-sm" />
      ) : (
        <MdOutlineCheckBoxOutlineBlank onClick={() => toogleSelectedType(data)} className=" text-sm cursor-pointer" />
      )}
      <span>{data.name}</span>
    </div>
  );
}

export default JobTypeItem;
