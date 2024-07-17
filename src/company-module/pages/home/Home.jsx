import { Helmet } from "react-helmet";
import FallbackComponent from "../../../components/Fallback";

function Home() {
  return (
    <>
      <Helmet>
        <title>Company Dashboard | Home</title>
      </Helmet>
      <div className="h-full w-full">Home Page of dasboard</div>
     
    </>
  );
}

export default Home;
