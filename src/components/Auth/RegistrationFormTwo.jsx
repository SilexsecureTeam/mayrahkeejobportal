import React, { useEffect, useReducer, useState } from "react";
import MainIcon from "../../assets/svgs/main-logo.svg";
import Person from "../../assets/pngs/person.png";
import PersonCircle from "../../assets/pngs/person-circle.png";
import MessageOpen from "../../assets/pngs/message-open.png";
import Card from "../../assets/pngs/card-icon.png";
import Padlock from "../../assets/pngs/padlock.png";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/FormButton";
import useRegistration from "../../hooks/useRegistration";
import { onSuccess } from "../../utils/notifications/OnSuccess";
import RegistrationSelector from "../RegistrationSelector";


const genders = [
  {
    id: 2000,
    name: '--select a gender--'
  },
  {
    id: 1,
    name: 'Male'
  },
  {
    id: 2,
    name: 'Female'
  },
]

function RegistrationFormTwo({ state, dispatch }) {
  const [isTrained, setIsTrained] = useState(false);
  const [gender, setGender] = useState(genders[0])
  const [role, setRole] = useState();
  const { regDetails, onTextChange, loading, registerUser } =
    useRegistration(role);
  const navigate = useNavigate();

  const toogleIsTrained = () => setIsTrained(!isTrained);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    registerUser(gender,() => {
      onSuccess({
        message: "Registration Succesfull",
        success: "An OTP has been sent to your email ",
      });
      localStorage.setItem('__reg_info', JSON.stringify({...regDetails, password: '__', re_enter_password: '__'}))
      navigate('/registration/email_verification')
    });
  };

  useEffect(() => {
    setRole("candidate");
  }, []);

  return (
    <div className="w-[50%] px-[5%] pt-[10px] flex flex-col  items-center">
      <img src={MainIcon} className="w-[60%]" />

      <div className="flex flex-col items-center gap-[8px] w-[60%]">
        <h1 className="font-semibold text-[25px]">Create Account</h1>
        <div className="flex w-full justify-center gap-[20px] text-sm font-semibold items-centeritems">
          <button
            onClick={() => setRole("candidate")}
            className={`px-2 py-1 ${
              role === "candidate"
                ? "text-white bg-primaryColor border-0"
                : "text-primaryColor border bg-primaryColor/30"
            }`}
          >
            Candidate
          </button>
          <button
            onClick={() => setRole("employer")}
            className={`px-2 py-1 ${
              role === "employer"
                ? "text-white bg-primaryColor border-0"
                : "text-primaryColor border bg-primaryColor/30"
            }`}
          >
            Employer
          </button>
        </div>
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
            value={regDetails.first_name}
            onChange={onTextChange}
            required
            className="w-[80%] h-full placeholder:text-little text-small bg-white/0 focus:bg-white/0  focus:outline-none text-gray-700 "
            placeholder="Enter first name"
          />
        </div>

        <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
          <img src={Person} className="h-[20px]" />
          <input
            name="last_name"
            type="text"
            value={regDetails.last_name}
            onChange={onTextChange}
            required
            className="w-[80%] h-full placeholder:text-little text-small bg-white/0 focus:bg-white/0  focus:outline-none text-gray-700 "
            placeholder="Enter last name"
          />
        </div>

        <div className="h-[40px] w-full flex items-center pl-[10px] gap-[10px] rounded-md border-[1.5px]">
          <img src={MessageOpen} className="h-[20px]" />
          <input
            name="email"
            type="email"
            value={regDetails.email}
            onChange={onTextChange}
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
            value={regDetails.password}
            onChange={onTextChange}
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
            value={regDetails.re_enter_password}
            onChange={onTextChange}
            required
            className="w-[80%] h-full placeholder:text-small text-little bg-white/0 focus:outline-none text-gray-700 "
            placeholder="Re-enter Password"
          />
        </div>

        <RegistrationSelector
          icon={Card}
          data={genders}
          selected={gender}
          setSelected={setGender}
        />
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
        <FormButton loading={loading}>Submit</FormButton>
      </form>
    </div>
  );
}

export default RegistrationFormTwo;
