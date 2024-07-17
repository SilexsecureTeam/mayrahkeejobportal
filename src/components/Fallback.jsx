import React, { useEffect, useRef } from "react";
import profileViewer from "../assets/anim/profile-viewer.json";
import searcherAnim from "../assets/anim/searcher-anim.json";
import Lottie from "lottie-react";

function FallbackComponent() {
  const lottieRef = useRef();


  useEffect(() => {
    if(lottieRef){

        lottieRef.current.setSpeed(1.5);
    }
  }, [lottieRef]);

  return (
    <main className="w-full h-screen bg-primaryColor flex justify-center items-center">
      <Lottie
        lottieRef={lottieRef}
        style={{ height: "25%" }}
        animationData={searcherAnim}
      />
    </main>
  );
}

export default FallbackComponent;
