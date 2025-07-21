import { Helmet } from "react-helmet";
import {
  RegistrationReducer,
  intialProfileState,
} from "../reducers/RegistrationReducer";
import { useReducer } from "react";
import RegistrationFormTwo from "../components/Auth/RegistrationFormTwo";

function RegistrationTwo() {
  const [state, dispatch] = useReducer(RegistrationReducer, intialProfileState);

  return (
    <>
      <Helmet>
        <title>Registration Page</title>
      </Helmet>
      <main className="w-screen h-screen flex">
        <RegistrationFormTwo />
      </main>
    </>
  );
}

export default RegistrationTwo;
