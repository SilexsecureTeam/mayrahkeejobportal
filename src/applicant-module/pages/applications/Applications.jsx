import { Helmet } from "react-helmet";

function Application() {
  return (
    <>
      <Helmet>
        <title>Dashboard | My Application </title>
      </Helmet>
      <div className="h-full w-full">Application page</div>
    </>
  );
}

export default Application;
