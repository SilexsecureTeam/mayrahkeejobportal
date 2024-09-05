import { Helmet } from "react-helmet";
import {
  RegistrationReducer,
  intialProfileState,
} from "../reducers/RegistrationReducer";
import RegistrationProgress from "../components/Auth/RegistrationProgress";
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

        <RegistrationFormTwo/>

      </main>
    </>
  );
}

export default RegistrationTwo;
