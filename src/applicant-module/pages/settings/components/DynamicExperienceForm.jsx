import React, { useState } from 'react'
import GroupExperience from './GroupExperience';
import { MdAdd } from 'react-icons/md';

const DynamicExperienceForm = () => {
    const [experiences, setExperiences] = useState([
        { title: "", description: "", company: '', position: '', startDate: '', endDate: '' },
    ]);

    const handleAddExperience = () => {
        setExperiences([...experiences, { title: "", description: "", company: '', position: '', startDate: '', endDate: '' }]);
    };

    const handleRemoveExperience = (index) => {
        if (experiences.length > 1) {
            const newExperiences = [...experiences];
            newExperiences.splice(index, 1);
            setExperiences(newExperiences);
        } else {
            return null
        }

    };
    console.log(experiences)

    const handleInputChange = (index, event) => {
        const newExperiences = [...experiences];
        newExperiences[index][event.target.name] = event.target.value;
        setExperiences(newExperiences);
    };

    return (
        <div>
            <div>
                {experiences.map((experience, index) => (
                    <GroupExperience
                        handleInputChange={handleInputChange}
                        handleRemoveExperience={handleRemoveExperience}
                        index={index}
                        experience={experience}
                        key={index} />
                ))}
                <button className='border px-3 py-1 flex bg-green-600 text-white' type="button" onClick={handleAddExperience}>
                    <MdAdd size={20} /> Add

                </button>
            </div>
        </div >
    )
}

export default DynamicExperienceForm