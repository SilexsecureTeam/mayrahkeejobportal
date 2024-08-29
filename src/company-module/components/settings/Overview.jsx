import wheelIcon from "../../../assets/pngs/wheel-icon-green.png";
import galleryIcon from "../../../assets/pngs/gallery-icon.png";
import DescriptionItem from "../job-posting/DescriptionItem";

function Overview() {
  const about = {
    title: "About company",
    desc: "Brief description for your company. URLs are hyperlinked.",
    placeholder:
      "Nomad is part of the Information Technology Industry...",
  };

  return (
    <div className="flex w-full flex-col p-2">
      {/* Basic Info */}
      <div className="flex flex-col gap-[15px] border-b pb-2">
        <h3 className="text-gray-700 text-sm font-semibold">
          Basic Information
        </h3>
        <span className="text-little text-gray-400">
          This Information will be displayed publicly
        </span>
      </div>

      {/*Company Logo */}
      <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col max-w-[25%] gap-[10px]">
          <h3 className="text-gray-700 text-sm font-semibold">Company Logo</h3>
          <span className="text-little text-gray-400">
            This image will be shown publicly as company logo.
          </span>
        </div>

        <div className="flex gap-[15px] items-center">
          <img src={wheelIcon} className="h-[50px]" />

          <div className=" h-[100px] w-[250px] border border-dashed items-center justify-center flex flex-col gap-[10px] border-primaryColor">
            <img src={galleryIcon} className="h-[20px]" />
            <input id="companyIcon" type="file" className=" hidden" />
            <label
              htmlFor="companyIcon"
              className="cursor-pointer text-primaryColor hover:underline text-[10px]"
            >
              Click to replace or drag and drop
            </label>
            <span className="text-little text-gray-400">
              SVG, PNG, JPG or GIF (max. 400 x 400px)
            </span>
          </div>
        </div>
      </div>

      {/*Company Details */}
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
            Company Name
          </label>
          <input
            placeholder="Circle"
            type="text"
            className=" border focus:outline-none w-full p-1 text-gray-400 text-little"
          />

          <label className="cursor-pointer text-gray-700 mb-[5px] mt-[10px] hover:underline text-little font-semibold">
            Company wbesite
          </label>
          <input
            placeholder="https://example.com"
            type="text"
            className=" border focus:outline-none w-full p-1 text-gray-400 text-little"
          />

          <label className="cursor-pointer text-gray-700 mb-[5px] mt-[10px] hover:underline text-little font-semibold">
            Locations
          </label>
          <input
            placeholder="https://example.com"
            type="text"
            className=" border focus:outline-none w-full p-1 text-gray-400 text-little"
          />
        </form>
      </div>

      {/* About Company */}
      <div >
        {/* <DescriptionItem data={about} /> */}
      </div>

      <button  className="p-2 place-self-end mt-[10px] font-semibold w-fit text-little bg-primaryColor text-white">Save Changes</button>

    </div>


  );
}

export default Overview;
