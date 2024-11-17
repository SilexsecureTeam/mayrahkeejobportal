import React, { useState } from 'react';
import ToggleCheckBox from './../../../components/checkbox/checkbox';
import UseAdminManagement from '../../../../hooks/useAdminManagement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

function AddCategory() {
    const [sector, setSector] = useState('');
    const [enableSubcategory, setEnableSubcategory] = useState(false);
    const [subsectors, setSubsectors] = useState(['']);
    const [loading, setLoading] = useState(false);
    const { createSectorWithSubsectors } = UseAdminManagement();
    const navigate = useNavigate();

    const handleSectorChange = (e) => setSector(e.target.value);
    const handleEnableSubcategoryChange = (e) => setEnableSubcategory(e.value);
    const handleSubsectorChange = (index, value) => {
        const newSubsectors = [...subsectors];
        newSubsectors[index] = value;
        setSubsectors(newSubsectors);
    };
    const handleAddSubsector = () => setSubsectors([...subsectors, '']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const sectorData = { name: sector };
            const result = await createSectorWithSubsectors(sectorData, subsectors);
            console.log(result);

            if (result) {
                toast.success('Sector and subsectors created successfully');
                console.log('Sector and subsectors created successfully', result);
                setTimeout(() => {
                    navigate('/admin/settings/sectors');
                }, 2000); // Delay navigation by 2 seconds
            } else {
                toast.error('Failed to create sector and subsectors');
            }
        } catch (error) {
            toast.error('Error creating sector and subsectors');
            console.error('Error creating sector and subsectors:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container px-8 py-10'>
            <button
                type="button"
                onClick={() => window.history.back()}
                className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
            >
                <FaArrowLeftLong className="me-4 text-green-500" />Back
            </button>
            <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">

                <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Input Sector Name</label>
                        <input
                            type="text"
                            value={sector}
                            onChange={handleSectorChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter sector name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Enable Subcategory</label>
                        <p className="text-gray-500 text-sm">
                            If a sector has a subcategory, use this button to activate it.
                        </p>
                        <ToggleCheckBox checked={enableSubcategory} onChange={(e) => setEnableSubcategory(e.value)} />
                    </div>
                    {enableSubcategory && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Input Sub Sectors</label>
                            {subsectors.map((subsector, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={subsector}
                                        onChange={(e) => handleSubsectorChange(index, e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md"
                                        placeholder="Enter sub sector name"
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={handleAddSubsector} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                                Add Sub Sector
                            </button>
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={loading}>
                            {loading ? 'Creating...' : 'Create category'}
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default AddCategory;