import { Helmet } from "react-helmet";
import SideCard from "../components/Auth/SideCard";
import { useState } from "react";
import RegistrationForm from "../components/Auth/RegistrationForm";

function Registration() {

  const [acceptTerms, setAcceptTerms] = useState(false)

  const toogleAcceptTerms = () => toogleAcceptTerms(!acceptTerms)

  return (
    <>
      <Helmet>
        <title>Registration Page</title>
      </Helmet>
      <main
        id="login-Wrapper"
        className={`h-screen w-screen flex bg-center items-start justify-start relative `}
      >
        {/* <img
          className="w-full h-full object-cover object-top absolute"
          src={LoginOne}
        /> */}

        <SideCard/>

        <RegistrationForm acceptTerms={acceptTerms} toogleAcceptTerms={toogleAcceptTerms} />
        </main>
    </>
  );
}

export default Registration;
