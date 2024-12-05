import { useState, useEffect, useContext } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'
import { BiBriefcase } from "react-icons/bi";
import approved from "../../assets/pngs/approved.png";
import { ResourceContext } from "../../context/ResourceContext";
import {IMAGE_URL} from '../../utils/base'
const Jobs = () => {
    const navigate=useNavigate()
    const { setGetAllFeaturedJobs, getAllFeaturedJobs } = useContext(ResourceContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all jobs
    useEffect(() => {
        try {
            setLoading(true);
            setError("");
            setGetAllFeaturedJobs((prev) => ({
                ...prev,
                isDataNeeded: true,
            }));
        } catch (err) {
            setError("Failed to fetch jobs. Please try again.");
            setLoading(false);
        }
    }, [setGetAllFeaturedJobs]);

    useEffect(() => {
        if (getAllFeaturedJobs?.data) {
            const fetchedBlogs = getAllFeaturedJobs?.data || [];
            const neededJobs = fetchedBlogs.filter(
                (one) => parseInt(one?.feature_jobs) === 1
            );
            setJobs(neededJobs);
            setLoading(false);
        } else if (getAllFeaturedJobs?.error) {
            setError("Failed to fetch jobs. Please try again.");
            setLoading(false);
        }
    }, [getAllFeaturedJobs]);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10 min-h-60 bg-gray-200">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-40 bg-gray-200">
                <p className="text-lg font-medium text-red-500">{error}</p>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-40 bg-gray-200">
                <p className="text-lg font-medium text-gray-500">
                    No jobs featuring at the moment. Please check back later.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 gap-y-10">
            {jobs.map((job) => (
                <div
                    key={job?.id}
                    className="w-80 min-h-60 p-5 rounded-2xl shadow-[0px_0px_5px] shadow-gray-300 flex flex-col justify-between"
                >
                    <section className="flex justify-between gap-3">
                        <div>
                            <h4 className="capitalize text-xl font-semibold my-2">
                                {job?.job_title}
                            </h4>
                            <p className="font-semibold text-sm text-gray-500 flex gap-2 items-center">
                                {job?.company || "Pinterest"}{" "}
                                <img src={approved} alt="approved" className="w-5" />
                            </p>
                        </div>
                        <img
                            src={`${IMAGE_URL}/${job?.featured_image}`}
                            alt="img"
                            className="h-10 w-10 object-cover"
                        />
                    </section>
                    <p
                        className="text-gray-500 text-sm my-3"
                        dangerouslySetInnerHTML={{
                            __html: job?.job_description.slice(0, 50),
                        }}
                    ></p>

                    <div className="flex gap-3 mt-auto text-green-600 capitalize text-xs">
                        <span className="flex items-center gap-2">
                            <FaLocationDot size="15" /> {job?.mode || "Remote"}
                        </span>
                        <span className="flex items-center gap-2">
                            <BiBriefcase size="15" /> {job?.type}
                        </span>
                    </div>
                    <button onClick={()=>{scrollTo(0,0); navigate("/login")}} className="my-2 cursor-pointer font-medium py-2 px-6 rounded-full capitalize w-full bg-black text-sm text-white">
                        Apply now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Jobs;
