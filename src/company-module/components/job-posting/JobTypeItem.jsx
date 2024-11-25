import { useState } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

function JobTypeItem({data,  selectedType, toogleSelectedType}) {
  

  return (
    <div className="flex items-center text-gray-400 text-little gap-[10px]" onClick={() => toogleSelectedType(data)}>
      {data?.name === selectedType?.name ? (
        <MdOutlineCheckBox onClick={() => toogleSelectedType({})} className="text-primaryColor cursor-pointer text-sm" />
      ) : (
        <MdOutlineCheckBoxOutlineBlank className=" text-sm cursor-pointer" />
      )}
      <span>{data.name}</span>
    </div>
  );
}

export default JobTypeItem;
