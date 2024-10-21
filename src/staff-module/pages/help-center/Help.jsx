import { useState } from "react";
import Header from "../../../company-module/components/help/Header";

const options = [
  {
    id: 1,
    name: "FAQ",
  },
];

function Help() {
  const [currentOption, setCurrentOption] = useState(options[0]);

  return (
    <div className="w-full px-12 py-5 flex flex-col gap-[20px]">
      <Header
        options={options}
        currentOption={currentOption}
        setCurrentOption={setCurrentOption}
      />
      <div className="w-full flex flex-col">
         <div className="">
          <h2 className="text-md font-semibold text-gray-800">How do I set schedule an interview?</h2>
          <p className="text-sm mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quos illum, sit adipisci commodi sapiente at! Dolor labore nobis dolorem blanditiis iure eius molestiae, inventore consequuntur enim ab assumenda voluptatem.</p>
         </div>

      </div>
    </div>
  );
}

export default Help;
