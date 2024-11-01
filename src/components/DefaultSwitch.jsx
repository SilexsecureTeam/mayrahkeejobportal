import React from "react";
import { Switch } from "@headlessui/react";

export default function DefaultSwitch({ enabled, setEnabled, onClick }) {
  return (
    <Switch
      checked={enabled}
      onClick={onClick}
      className="flex-shrink-0 group relative flex h-7 w-14 p-1 cursor-pointer rounded-full bg-gray-500 border transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-primaryColor">
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 my-auto pointer-events-none inline-block size-5 translate-x-[100%] rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-0"
      />
    </Switch>
  );
}
