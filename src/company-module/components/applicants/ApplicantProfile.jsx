function ApplicantProfile() {
  return (
    <>
      <div className="w-[80%] flex flex-col">
        <h3 className="font-semibold text-sm px-2">Personal Info</h3>

        <ul className="grid grid-cols-2 gap-y-2 px-2 mt-[3px]">
          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">Full Name</span>
            <span className="text-gray-700 font-semibold text-little">
              John Davis
            </span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">Date of Birth</span>
            <span className="text-gray-700 font-semibold text-little">
              Male
            </span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">Gender</span>
            <span className="text-gray-700 font-semibold text-little">
              March 23, 1995 (26 y.o)
            </span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">Language</span>
            <span className="text-gray-700 font-semibold text-little">
              English, French, Bahasa
            </span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">Address</span>
            <span className="text-gray-700 font-semibold text-little">
              4517 Washington Ave. Manchester, Kentucky 39495
            </span>
          </li>
        </ul>
      </div>
      <hr className="h-[1px] bg-gray-400 w-full" />

      <div className="w-[80%] flex flex-col">
        <h3 className="font-semibold text-sm px-2">Professional Info</h3>

        <span className="text-sm px-2 text-gray-400 mt-2">About me</span>

        <div className="flex flex-col px-2 mt-1 gap-[5px]">
          <p className="text-little">
            I’m a product designer + filmmaker currently working remotely at
            Twitter from beautiful Manchester, United Kingdom. I’m passionate
            about designing digital products that have a positive impact on the
            world.
          </p>
          <p className="text-little">
            I’m a product designer + filmmaker currently working remotely at
            Twitter from beautiful Manchester, United Kingdom. I’m passionate
            about designing digital products that have a positive impact on the
            world.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-y-2 px-2 mt-2">
          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">Current Job</span>
            <span className="text-gray-700 font-semibold text-little">
              Product Designer
            </span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">Experience in Years</span>
            <span className="text-gray-700 font-semibold text-little">
              4 Years
            </span>
          </li>

          <li className="flex flex-col">
            <span className="text-gray-400 text-sm">
              Highest Qualification Held
            </span>
            <span className="text-gray-700 font-semibold text-little">
              Bachelors in Engineering
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ApplicantProfile;
