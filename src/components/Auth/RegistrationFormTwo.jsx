import React, { useEffect, useReducer, useState } from "react";
import MainIcon from "../../assets/svgs/main-logo.svg";
import Person from "../../assets/pngs/person.png";
import PersonCircle from "../../assets/pngs/person-circle.png";
import MessageOpen from "../../assets/pngs/message-open.png";
import Padlock from "../../assets/pngs/padlock.png";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate} from "react-router-dom";
import FormButton from "../../components/FormButton";

function RegistrationFormTwo({state, dispatch}) {
  const [isTrained, setIsTrained] = useState(false);
  const navigate = useNavigate();

  const toogleIsTrained = () => setIsTrained(!isTrained);

  const handleOnSubmit = (e) => {
    e.preventDefault();

  };


  return (
    <div className="w-[50%] px-[5%] pt-[10px] flex flex-col  items-center">
      <img src={MainIcon} className="w-[60%]" />

      <div className="flex flex-col items-center gap-[8px] w-[60%]">
        <h1 className="font-semibold text-[25px]">Create Account</h1>
        <p className="text-little text-gray-400 text-center">
          Please complete the fields below.If you already have an existing
          accounts, please follow{" "}
          <span className="text-green hover:underline cursor-pointer">
            Get Access
          </span>{" "}
          to login
        </p>
      </div>

      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col w-[65%] mt-[10px] items-center gap-[5px] "
      >
        <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
          <img src={Person} className="h-[20px]" />
          <input
            name="first_name"
            type="text"
            required
            className="w-[80%] h-full placeholder:text-little text-small bg-white/0 focus:bg-white/0  focus:outline-none text-gray-700 "
            placeholder="First name"
          />
        </div>
        <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
          <img src={PersonCircle} className="h-[20px]" />
          <input
            name="last_name"
            type="text"
            required
            className="w-[80%] h-full placeholder:text-little text-little bg-white/0 focus:bg-white/0  focus:outline-none text-gray-700 "
            placeholder="Last name"
          />
        </div>

        <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
          <img src={MessageOpen} className="h-[20px]" />
          <input
            name="email"
            type="email"
            required
            className="w-[80%] h-full placeholder:text-little text-little bg-white/0 focus:bg-white/0  focus:outline-none text-gray-700 "
            placeholder="Email"
          />
        </div>
        <div className="h-[40px] w-full flex items-center pl-[10px]  gap-[10px] rounded-md border-[1.5px]">
          <img src={Padlock} className="h-[20px]" />
          <input
            name="password"
            type="password"
            required
            className="w-[80%] h-full placeholder:text-little text-little bg-white/0 focus:outline-none text-gray-700 "
            placeholder="Password"
          />
        </div>
        <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
          <img src={Padlock} className="h-[20px]" />
          <input
            name="re_enter_password"
            type="password"
            required
            className="w-[80%] h-full placeholder:text-small text-little bg-white/0 focus:outline-none text-gray-700 "
            placeholder="Re-enter Password"
          />
        </div>

        <p className="text-gray-400 flex gap-[10px] items-center text-little">
          {isTrained ? (
            <IoMdCheckbox
              onClick={toogleIsTrained}
              className="text-meduim text-green"
            />
          ) : (
            <MdCheckBoxOutlineBlank
              onClick={toogleIsTrained}
              className="text-meduim"
            />
          )}{" "}
          Accept terms and conditions?
        </p>
        <FormButton loading={false}>Submit</FormButton>
      </form>
    </div>
  );
}

export default RegistrationFormTwo;
