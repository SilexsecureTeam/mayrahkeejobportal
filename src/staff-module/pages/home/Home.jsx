import { useState } from "react";
import ProfileForm from "../../components/home/ProfileForm";
import ViewProfileDetails from "../../components/home/ViewProfileDetils";

const options = ["View Profile", "Update Profile"];

function Home() {
  const [option, setOption] = useState(options[0]);

  const setToMain = () => setOption(options[0]);

  return (
    <div className="h-fit w-full py-5 px-2 md:px-12 gap-[15px] flex flex-col">
      <div className="w-full h-[45px] border-b flex gap-3">
        {options.map((current) => (
          <button
            className={`h-full p-2 ${
              option == current
                ? "border-b bg-primaryColor font-semibold text-white text-bold"
                : "border-0 text-gray-400"
            }`}
            onClick={() => setOption(current)}
          >
            {current}
          </button>
        ))}
      </div>

      {option === options[0] ? (
        <ViewProfileDetails />
      ) : option === options[1] ? (
        <ProfileForm setToMain={setToMain} />
      ) : (
        <span>Page not found</span>
      )}
    </div>
  );
}

export default Home;
