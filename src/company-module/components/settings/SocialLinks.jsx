import wheelIcon from "../../../assets/pngs/wheel-icon-green.png";
import galleryIcon from "../../../assets/pngs/gallery-icon.png";
import DescriptionItem from "../job-posting/DescriptionItem";

function SocialLinks() {
  const about = {
    title: "About company",
    desc: "Brief description for your company. URLs are hyperlinked.",
    placeholder:
      "Nomad is part of the Information Technology Industry...",
  };

  return (
    <div className="flex w-full flex-col p-2">

      {/*Basin Info*/}
      <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col max-w-[25%] gap-[10px]">
          <h3 className="text-gray-700 text-sm font-semibold">
            Company Details
          </h3>
          <span className="text-little text-gray-400">
            Introduce your company core info quickly to users by fill up company
            details.
          </span>
        </div>

        <form className="items-start justify-center w-[30%] flex flex-col p-2 ">
          <label className="cursor-pointer text-gray-700 mb-[5px] hover:underline text-little font-semibold">
            Instagram
          </label>
          <input
            placeholder="https://example.com"
            type="text"
            className=" border focus:outline-none w-full p-1 text-gray-400 text-little"
          />

          <label className="cursor-pointer text-gray-700 mb-[5px] mt-[10px] hover:underline text-little font-semibold">
            Twitter
          </label>
          <input
            placeholder="https://example.com"
            type="text"
            className=" border focus:outline-none w-full p-1 text-gray-400 text-little"
          />

          <label className="cursor-pointer text-gray-700 mb-[5px] mt-[10px] hover:underline text-little font-semibold">
            Facebook
          </label>
          <input
            placeholder="https://example.com"
            type="text"
            className=" border focus:outline-none w-full p-1 text-gray-400 text-little"
          />
          <label className="cursor-pointer text-gray-700 mb-[5px] mt-[10px] hover:underline text-little font-semibold">
            Youtube
          </label>
          <input
            placeholder="https://example.com"
            type="text"
            className=" border focus:outline-none w-full p-1 text-gray-400 text-little"
          />
        </form>
      </div>

      <button  className="p-2 place-self-end mt-[10px] font-semibold w-fit text-little bg-primaryColor text-white">Save Changes</button>
     
    </div>
  );
}

export default SocialLinks;
