import React, {useState} from 'react';
import img from '../../assets/pngs/about3.png'
const LearningHeroSection = ({list}) => {
    const[selected,setSelected]=useState(1);
    return (
        <section className="mt-24">
            <figure className="h-80 mb-10 ">
                <img src={img} alt="image" className="rounded mb-4 w-full h-full object-cover" />
            </figure>
            <div className="w-[95%] md:max-w-[1400px] mx-auto">
            <h1 className="text-4xl font-bold">Unlock Knowledge, Achieve Excellence</h1>
            <p className="text-gray-600 mt-2">
                Access diverse courses, master new skills, and advance your learning
                journey.
            </p>
            <div className="flex space-x-4 mt-6 border-b-[1px] border-b-gray-400 overflow-x-auto">
                {
                    list?.map((course) => (
                        <button key={course?.id} onClick={()=>setSelected(course?.id)} className={`capitalize text-sm px-6 py-2 ${selected === course?.id ? "text-green-600 border-b-[2px] border-b-green-600" : "text-gray-700"} font-bold`}>
                            {course?.title}
                        </button>
                    ))
                }
            </div>
            </div>
        </section>
    )
};
export default LearningHeroSection;