import React, { useState } from 'react'
import SocialsGroup from './SocialsGroup';
import { MdAdd } from 'react-icons/md';

const SocialsForm = ({experiences, setExperiences}) => {
    // const [experiences, setExperiences] = useState([
    //     { network: "", url: "", },
    // ]);

    const handleAddExperience = () => {
        setExperiences([...experiences, { network: "", url: "", }]);
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
    // console.log(experiences)

    const handleInputChange = (index, event) => {
        const newExperiences = [...experiences];
        newExperiences[index][event.target.name] = event.target.value;
        setExperiences(newExperiences);
    };

    return (
        <div>
            <div>
                {experiences.map((experience, index) => (
                    <SocialsGroup
                        handleInputChange={handleInputChange}
                        handleRemoveExperience={handleRemoveExperience}
                        index={index}
                        experience={experience}
                        key={index} />
                ))}
                <button className='border px-3 flex py-1 bg-green-600 text-white' type="button" onClick={handleAddExperience}>
                    <MdAdd size={20} /> Add
                </button>
            </div>
        </div >
    )
}

export default SocialsForm