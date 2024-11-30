import { FaSearchLocation } from 'react-icons/fa';
import { jobDetails } from './LandingData';
import tunnel from '../../assets/pngs/Tunnel.png'
import approved from '../../assets/pngs/approved.png'
import bgImg from "../../assets/pngs/happy-couple-of-african-american-business-partners-2023-11-27-05-18-22-utc.jpg";
import {BiBriefcase} from 'react-icons/bi'
const Advert=()=>{
    return(
        <div className="w-full min-h-72 my-8 rounded-xl p-8 text-white flex flex-wrap gap-16 md:gap-10 justify-between items-center"
       style={{
        backgroundImage: `linear-gradient(rgba(0,100,0,.7), rgba(0,0,100,.7)), url(${bgImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
>
            {/* Left */}
            <section className="flex flex-col gap-3 w-96 my-4">
                <h3 className="text-2xl font-bold">Join our community of ambitious professionals today and unlock the doors to dream career</h3>
                <p className="text-sm">Figma ipsum component variant main layer. Outline distribute image line rotate flows.</p>
                <button className="mt-2 cursor-pointer font-medium py-2 px-6 rounded-full capitalize w-40 bg-black text-sm text-white"> Get started now</button>
            </section>

            {/* Right */}
            <section className='flex-1 w-full md:w-1/2 min-h-80 flex items-center justify-center md:justify-end'>
            <div className="advert relative justify-center pr-20 md:justify-between items-center gap-4">
            {jobDetails?.slice(0,3)?.map((job)=>(
            <div key={job?.id} className="w-72 h-32 p-5 rounded-2xl shadow-[0px_0px_10px] shadow-gray-700 bg-white">
                <section className="flex justify-between gap-3 text-black">
                    <div>
                        <h4 className="capitalize text-sm font-semibold my-2">{job?.title}</h4>
                        <p className="font-semibold text-xs text-gray-500 flex gap-2">{job?.company} <img src={approved} className="w-5" /></p>
                    </div>
                    <img src={job?.logo} alt="img" className="h-10" />
                </section>

                <div className="flex justify-between gap-3 my-3 text-gray-600 capitalize">
                    <span className="bg-gray-300 px-2 py-1 rounded-xl flex items-center justify-center text-xs gap-2"><FaSearchLocation size="15" /> {job?.mode}</span>
                    <span className="bg-gray-300 px-2 py-1 rounded-xl flex items-center justify-center text-xs gap-2"><BiBriefcase size="15" /> {job?.type}</span>
                </div>
            </div>
            ))}
        </div>
            </section>
        </div>
    )
}

export default Advert;