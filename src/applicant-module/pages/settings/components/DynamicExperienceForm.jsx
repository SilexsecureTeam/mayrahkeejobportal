import React, { useState } from 'react'
import GroupExperience from './GroupExperience';

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
    } else{
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
                <button className='border px-5 py-2 bg-green-600 text-white' type="button" onClick={handleAddExperience}>
                    Add Experience
                </button>
            </div>
        </div >
    )
}

export default DynamicExperienceForm