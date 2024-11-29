import { FaSearchLocation } from 'react-icons/fa';
import { jobDetails } from './LandingData';
import approved from '../../assets/pngs/approved.png'
import {BiBriefcase} from 'react-icons/bi'
const Jobs = () => {
    return (
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
            {jobDetails?.map((job)=>(
            <div key={job?.id} className="max-w-80 min-h-60 p-5 rounded-2xl shadow-[0px_0px_10px] shadow-gray-300">
                <section className="flex justify-between gap-3">
                    <div>
                        <h4 className="capitalize text-xl font-semibold my-2">{job?.title}</h4>
                        <p className="font-semibold text-sm text-gray-500 flex gap-2">{job?.company} <img src={approved} className="w-5" /></p>
                    </div>
                    <img src={job?.logo} alt="img" className="h-10" />
                </section>
                <p className="text-gray-500 text-sm my-3">{job?.desc}</p>

                <div className="flex gap-3 my-3 text-green-600 capitalize">
                    <span className="flex items-center justify-center text-xs gap-2"><FaSearchLocation size="15" /> {job?.mode}</span>
                    <span className="flex items-center justify-center text-xs gap-2"><BiBriefcase size="15" /> {job?.type}</span>
                </div>
                <button className="mt-2 cursor-pointer font-medium py-2 px-6 rounded-full capitalize w-full bg-black text-sm text-white"> Apply now</button>

            </div>
            ))}

        </div>
    )
}

export default Jobs;