import { useEffect } from "react";

function SocialMediaInput({ data, socials, setSocials }) {
  const updateCurrentVal = (e) => {
    const socialsUpdate = [...socials];
    const val = e.target.value;

    switch (data.id) {
      case 1:
        socialsUpdate[0] = val;
        break;
      case 2:
        socialsUpdate[1] = val;
        break;
      case 3:
        socialsUpdate[2] = val;
        break;
      case 4:
        socialsUpdate[3] = val;
        break;
    }

    setSocials((prev) => {
      return { ...prev, social_media: socialsUpdate };
    });
  };

  const defaultCurrentVal = () => {
    let value = "";

    switch (data.id) {
      case 1:
        value = socials[0] ? socials[0] : "";
        break;
      case 2:
        value = socials[1] ? socials[1] : "";
        break;
      case 3:
        value = socials[2] ? socials[2] : "";
        break;
      case 4:
        value = socials[3] ? socials[3] : "";
        break;
    }

    console.log("deafult", value);
    return value;
  };

  return (
    <div className="h-fit p-1 flex items-center justify-center gap-[5px] border">
      {data.icon}
      <input
        defaultValue={defaultCurrentVal()}
        placeholder={data.placeholder}
        onChange={updateCurrentVal}
        className="w-[95%] focus:outline-none"
      />
    </div>
  );
}

export default SocialMediaInput;
