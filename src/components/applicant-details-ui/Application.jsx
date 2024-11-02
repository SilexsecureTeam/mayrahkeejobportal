import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FiUser } from "react-icons/fi";
import { BsArrowDown } from "react-icons/bs";
import { FaCalendarAlt, FaCloudUploadAlt, FaFileExport, FaPlus, FaRegListAlt, FaSearch, FaTag } from "react-icons/fa";
import { AiOutlineGoogle } from 'react-icons/ai'
import RoundChart from "./RoundChart";
import img from '../../assets/specialist-office.jpg'
const AllApplication = () => {
    const [series] = useState([60]); // Progress percentage of 60%
    const offer = { name: "Tiger Nixon", position: "System Architect", age: 61, experience: "Abuja-Nigeria", salary: "N 67,000.00", date: "22/5/2024" }
    const [options] = useState({
        chart: {
            type: "radialBar",

        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "50%", // Inner circle size for the hollow effect
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: false, // Hide the label
                    },
                    value: {
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        offsetY: 5, // Center the percentage vertically
                        formatter: (val) => `${val}%`, // Display as percentage
                    },
                },
            },
        },
        colors: ["#FFFFFF"], // Color of the progress bar
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Good Evening, Jake</h2>
                        <div className="flex gap-4 text-sm text-[#47AA49] mt-2">
                            <span>Offers</span>
                            <span>Rejected</span>
                            <span>Offer History</span>
                        </div>
                    </div>
                </div>

                {/* Performance & Chart */}
                <div className="flex flex-wrap items-center gap-6 mt-6">
                    <div className="p-4 bg-[#0F5A02] rounded-xl shadow w-full h-max md:w-80 min-h-48 flex flex-wrap items-center gap-y-2">
                        <div className="w-max p-0"><Chart options={options} series={series} type="radialBar" width={150} height={200} /></div>
                        <section className="flex-1">

                            <h3 className="font-semibold mb-2 text-white">Available Drivers</h3>
                            <p className="text-xs text-gray-300">Complete your profiles to unlock all features</p>

                        </section>
                        <button className="flex-1 basis-full my-auto py-3 px-4 h-max bg-white text-[#0F5A02] rounded-md font-semibold">Verify Identity</button>
                    </div>

                    <div className="flex-1 flex flex-col gap-4 mt-4 lg:mt-0 lg:ml-4 bg-white p-3 w-full min-[900px]:w-2/4 rounded-xl">
                        <article>
                            <h3 className='fbold text-xl'>Performance</h3>
                            <p className='text-sm text-gray-500'>1,046 Inbound Calls today</p>
                        </article>
                        <RoundChart series={[72.56, 29.34, 17.83]} colors={["#00D9D9", "#7239EA", "#E4E6EF"]} />

                    </div>

                </div>

                {/* New Offers Table */}
                <div className="mt-6">
                    <section className='text-sm my-10 flex justify-end items-stretch gap-3'>
                        <button className="flex items-center gap-2 text-[#47AA49] border border-[#47AA49] py-2 px-4 rounded w-max lg:w-auto">
                            <FaFileExport /> Export
                        </button>
                        <button className="flex items-center gap-2 text-white bg-[#47AA49] py-2 px-4 rounded w-max lg:w-auto">
                            <FaPlus /> Generate report
                        </button>
                    </section>
                    <h3 className="text-xl md:text-2xl font-bold text-[#0F5A02]">New Offers</h3>
                    <section className='flex gap-4 mt-3 border-b border-gray-200'>
                        <p className={`${true ? 'text-[#47AA49] border-b-2 border-[#47AA49]' : ' pb-3 text-gray-600'} text-sm font-semibold`}>All Offers</p>
                        <p className={`${false ? 'text-[#47AA49] border-b-2 border-[#47AA49]' : ' pb-3 text-gray-600'} text-sm font-semibold`}>Succeeded</p>
                        <p className={`${false ? 'text-[#47AA49] border-b-2 border-[#47AA49]' : ' pb-3 text-gray-600'} text-sm font-semibold`}>Refunded</p>
                    </section>

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {/* Date Select */}
                            <label htmlFor="date" className="flex items-center border p-2 rounded-md w-full lg:w-auto bg-gray-50">
                                <FaCalendarAlt className="mr-2 text-gray-600" />
                                <select id="date" className="flex-1 bg-transparent border-0 focus:outline-none">
                                    <option>Date</option>
                                    {/* Replace these with dynamic options as needed */}
                                    <option>2024-11-01</option>
                                    <option>2024-11-02</option>
                                </select>
                            </label>

                            {/* Status Select */}
                            <label htmlFor="status" className="flex items-center border p-2 rounded-md w-full lg:w-auto bg-gray-50">
                                <FaRegListAlt className="mr-2 text-gray-600" />
                                <select id="status" className="flex-1 bg-transparent border-0 focus:outline-none">
                                    <option>Status</option>
                                    <option>Succeeded</option>
                                    <option>Refunded</option>
                                </select>
                            </label>

                            {/* Category Select */}
                            <label htmlFor="category" className="flex items-center border p-2 rounded-md w-full lg:w-auto bg-gray-50">
                                <FaTag className="mr-2 text-gray-600" />
                                <select id="category" className="flex-1 bg-transparent border-0 focus:outline-none">
                                    <option>Category</option>
                                    <option>Full-Time</option>
                                    <option>Part-Time</option>
                                </select>
                            </label>

                        </div>
                        {/* Search Input */}
                        <div className="flex items-center border p-2 rounded bg-gray-50 w-full md:w-1/3 md:ml-auto">
                            <FaSearch className="mr-2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by name, experience..."
                                className="flex-1 bg-transparent border-0 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className=" md:table-fixed w-full md:min-w-full overflow-x-auto mt-4 bg-white rounded-md shadow">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4 text-left text-sm md:text-base">Name</th>
                                    <th className="p-4 text-left text-sm md:text-base">Position</th>
                                    <th className="p-4 text-left text-sm md:text-base">Age</th>
                                    <th className="p-4 text-left text-sm md:text-base">Experience</th>
                                    <th className="p-4 text-left text-sm md:text-base">Salary</th>
                                    <th className="p-4 text-left text-sm md:text-base">Start date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={offer.id} className="border-b">
                                    <td className="p-4 whitespace-nowrap flex gap-2 items-center text-sm md:text-base">
                                        <img src={img} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
                                        {offer.name}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm md:text-base">{offer.position}</td>
                                    <td className="p-4 whitespace-nowrap text-sm md:text-base">{offer.age}</td>
                                    <td className="p-4 whitespace-nowrap text-sm md:text-base">{offer.experience}</td>
                                    <td className="p-4 whitespace-nowrap text-sm md:text-base">{offer.salary}</td>
                                    <td className="p-4 whitespace-nowrap text-sm md:text-base">{offer.date}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="min-h-40 md:col-span-2 p-4 bg-white flex flex-col">
                            <section className="flex gap-2 items-center">
                                <img src={img} className="w-20 h-20 rounded-full object-cover" alt="Profile" />
                                <div>
                                    <p className="font-medium text-[16px]">{offer.name}</p>
                                    <p className="text-gray-400 text-[12px]">This will be displayed onb your profile</p>
                                </div>
                            </section>
                            <form className="grid grid-cols-2 gap-2 gap-y-4 md:gap-y-8 py-4 md:py-8 text-xs md:text-sm">
                                <label>
                                    First name
                                    <input className="w-full p-2 bg-gray-100 placeholder:text-gray-400 rounded-md border-1 border-gray-50" placeholder="Kame" type="text" />
                                </label>
                                <label>
                                    Last name
                                    <input className="w-full p-2 bg-gray-100 placeholder:text-gray-400 rounded-md border-1 border-gray-50" placeholder="Williamson" type="text" />
                                </label>
                                <label>
                                    email Address
                                    <input className="w-full p-2 bg-gray-100 placeholder:text-gray-400 rounded-md border-1 border-gray-50" placeholder="kamewillamson@gmail.com" type="text" />
                                </label>
                                <label>
                                    Date of birth
                                    <input className="w-full p-2 bg-gray-100 placeholder:text-gray-400 rounded-md border-1 border-gray-50" placeholder="25/01/2001" type="text" />
                                </label>
                                <label>
                                    City
                                    <input className="w-full p-2 bg-gray-100 placeholder:text-gray-400 rounded-md border-1 border-gray-50" placeholder="Abuja, Nigeria" type="text" />
                                </label>
                                <label>
                                    Postal Code
                                    <input className="w-full p-2 bg-gray-100 placeholder:text-gray-400 rounded-md border-1 border-gray-50" placeholder="87532" type="text" />
                                </label>
                            </form>
                            <button className="self-end px-8 py-1 rounded-md bg-[#47AA49] text-white">Next</button>
                        </div>
                        <div className="min-h-40 md:col-span-1 flex flex-col gap-2">
                            <div className="bg-white rounded-md p-4">
                                <p className="font-medium border-b border-gray-300 p-4">Your Photo </p>
                                <section className="flex gap-2 items-center my-4">
                                    <img src={img} className="w-7 h-7 rounded-full object-cover" alt="Profile" />
                                    <div>
                                        <p className="font-medium text-[12px]">Edit your photo</p>
                                        <p className="text-gray-400 text-[10px]">Deetails update</p>
                                    </div>
                                </section>
                                <div className="p-5 min-h-28 border-[1px] border-dashed border-[#7239EA] flex flex-col gap-3 justify-center items-center">

                                    <FaCloudUploadAlt size="18" />
                                    <p className="text-[10px] text-[#7239EA] text-center">Click to Upload or drag and drop SVG, PNG, JPG or GIF</p>
                                </div>

                            </div>

                            <div className="min-h-20 my-4 bg-white rounded-md p-4 flex flex-col gap-4 justify-center">
                                <p className="flex justify-between items-center"><AiOutlineGoogle size="24" /> <span className="px-4 py-1 bg-purple-300 text-purple-500 font-medium rounded-md text-xs">Completed</span></p>
                                <small className="w-[80%]">Use google to sign in to your account.<a href="#" className="no-underline text-purple-500">Click to learn more</a></small>
                            </div>

                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
};

export default AllApplication;
