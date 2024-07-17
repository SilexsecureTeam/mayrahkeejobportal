import { Helmet } from "react-helmet";

function PublicProfile() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Public Profile </title>
      </Helmet>
      <div className="h-full w-full">Public Profile page</div>
    </>
  );
}

export default PublicProfile;
