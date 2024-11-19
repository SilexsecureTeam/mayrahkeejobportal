import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import UseAdminManagement from '../../../../hooks/useAdminManagement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeftLong } from 'react-icons/fa6';
import SalaryTable from './SalaryTable';


export default function Salaries() {
    const [salaries, setSalaries] = useState([]);
    const [selectedSalaries, setSelectedSalaries] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const { getSalaries, deleteSalaryById } = UseAdminManagement();

    useEffect(() => {
        const fetchSalaries = async () => {
            const data = await getSalaries();
            console.log(data);
        
            if (data) {
                setSalaries(data);
            } else {
                console.error("No data received");
            }
        };
        fetchSalaries();
    }, []);

    const items = [
        { label: 'Overview', icon: 'pi pi-list' },
        { label: 'Manage Salaries', icon: 'pi pi-list' },
    ];

    const handleAddSalary = () => {
        navigate('/admin/settings/salary/add');
    };

    const handleDelete = async (id) => {
        try {
            await deleteSalaryById(id);
            toast.success('Salary deleted successfully');
            const data = await getSalaries();
            setSalaries(data);
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    return (
        <div className="card px-8">
            <div className='px-8 py-5'>
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
                >
                    <FaArrowLeftLong className="me-4 text-green-500" />Back
                </button>
            </div>
            <ToastContainer />
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Salary Management</h1>
                <button onClick={handleAddSalary} className="bg-green-700 px-4 py-2 text-white rounded-md flex items-center justify-center">
                    <FaPlus className="mr-2" /> Add Salary
                </button>
            </div>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 && (
                <SalaryTable
                    title="Overview"
                    products={salaries}
                    selectedProducts={selectedSalaries}
                    setSelectedProducts={setSelectedSalaries}
                    buttons={[]} // No buttons for Overview
                />
            )}
            {activeIndex === 1 && (
                <SalaryTable
                    title="Manage Salaries"
                    products={salaries}
                    selectedProducts={selectedSalaries}
                    setSelectedProducts={setSelectedSalaries}
                    buttons={['delete']} // Only delete button for Manage Salaries
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
