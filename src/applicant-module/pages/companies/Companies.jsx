import { Helmet } from "react-helmet";
import { CiGrid2H, CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { MdArrowDropUp } from "react-icons/md";
import CompaniesCategory from "./components/CompaniesCategory";
import { BsGrid, BsGrid1X2Fill, BsGridFill } from "react-icons/bs";
import newApplicant from "../../../assets/pngs/applicant-logo1.png"
import newApplicant2 from "../../../assets/pngs/applicant-Logo2.png"
import newApplicant3 from "../../../assets/pngs/applicant-logo3.png"
import Pagination from "../../components/Pagination";
import { TbLayoutList, TbLayoutListFilled } from "react-icons/tb";
import { useState } from "react";
import CompanyGridCard from "./components/CompanyGridCard";
import CompanyCard from "./components/CompanyCard";

function Companies() {
  const [isGrid, setIsGrid] = useState(true);

  return (
    <>
      <Helmet>
        <title>Dashboard | Browse Companies </title>
      </Helmet>
      <div className="h-full text-[#25324b] p-6 text-sm w-full">
        <div className="px-3 py-5 border mb-2 flex">
          <div className="relative border-b py-1 px-6 mx-4 w-[35%] ">
            <input type="text" placeholder="Company title or keyword" className="pl-[10px] focus:outline-none w-full" />
            <span className="absolute text-primary top-0 left-0 p-2">
              <CiSearch size={20} />
            </span>
          </div>
          <div className="relative border-b py-1 px-6 mx-4 w-[35%]">
            <input type="text" placeholder="Florence, Italy" className="pl-[10px] focus:outline-none w-full" />
            <span className="absolute text-primary top-0 left-0 p-2">
              <GrLocation size={20} />
            </span>
          </div>
          <button className="bg-green-700 text-white py-2 px-6 hover:bg-green-900 font-medium">Search</button>
        </div>
        <p>Popular : Twitter, Microsoft, Apple, Facebook</p>
        <div className="my-6">
          <div className="flex">
            <div className="w-[25%]">
              <div className="checks_container pr-5">
                <div className="mb-4">
                  <CompaniesCategory />
                </div>
              </div>
            </div>
            <div className="w-[75%]">
              <div>
                <h4 className="font-bold text-base">All Companies</h4>
                <div className="flex justify-between mb-6">
                  <div className="">
                    <p>Showing 73 results</p>
                  </div>
                  <div className="flex">
                    <div className="flex mr-3">
                      <span>Sorted by :</span>
                      <button className="flex">
                        <span className="mr-2 font-medium items-center">Most relevant</span>
                        <span><FaChevronDown size={10} /></span>
                      </button>
                    </div>
                    <div className="border-l px-2">
                      <button
                        onClick={() => setIsGrid(true)}
                        className="bg-gray-200 rounded p-1 mx-3"> {isGrid ? <BsGridFill className="prime_text" /> : <BsGrid />}  </button>
                      <button
                        onClick={() => setIsGrid(false)}
                        className="bg-gray-200 rounded p-1">
                        {isGrid ? <TbLayoutList /> : <TbLayoutListFilled className="prime_text" />} </button>
                    </div>
                  </div>
                </div>
                {isGrid ? (<div className="">
                  <div className="grid grid-cols-3 gap-4">
                    <CompanyGridCard newApplicant={newApplicant} />
                    <CompanyGridCard newApplicant={newApplicant2} />
                    <CompanyGridCard newApplicant={newApplicant3} />
                    <CompanyGridCard newApplicant={newApplicant} />
                    <CompanyGridCard newApplicant={newApplicant2} />
                    <CompanyGridCard newApplicant={newApplicant3} />
                    <CompanyGridCard newApplicant={newApplicant} />
                    <CompanyGridCard newApplicant={newApplicant2} />
                    <CompanyGridCard newApplicant={newApplicant3} />
                  </div>
                </div>
                ) : (
                  <div>
                    <CompanyCard newApplicant={newApplicant} />
                    <CompanyCard newApplicant={newApplicant2} />
                    <CompanyCard newApplicant={newApplicant3} />
                    <CompanyCard newApplicant={newApplicant} />
                    <CompanyCard newApplicant={newApplicant2} />
                    <CompanyCard newApplicant={newApplicant3} />
                  </div>
                )}
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Companies;
