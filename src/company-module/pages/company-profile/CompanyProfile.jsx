import { Helmet } from "react-helmet";
import ProfileHeader from "../../components/company-profile/ProfileHeade";
import { company_profile_attributes } from "../../../utils/constants";
import HeaderAttribute from "../../components/company-profile/HeaderAttribute";
import DetailsLeft from "../../components/company-profile/DetailsLeft";
import DetailsRight from "../../components/company-profile/DetailsRight";
import { useContext, useState } from "react";
import UpdateCompanyProfileModal from "../../components/company-profile/UpdateCompanyProfileModal";
import { AuthContext } from "../../../context/AuthContex";

function CompaniesProfile() {
  const [displayPic, setDisplayPic] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title> Company Dashboard | Companies Profile </title>
      </Helmet>
      <UpdateCompanyProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="h-full w-full flex flex-col p-2 justify-between">
        <ProfileHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          displayPic={displayPic}
          setDisplayPic={setDisplayPic}
        >
          {company_profile_attributes.map((current) => (
            <HeaderAttribute key={current.id} data={current} />
          ))}
        </ProfileHeader>

        <div className="flex w-full justify-between overscroll-y-auto h-[73%]">
          <DetailsLeft />
          <DetailsRight />
        </div>
      </div>
    </>
  );
}

export default CompaniesProfile;
