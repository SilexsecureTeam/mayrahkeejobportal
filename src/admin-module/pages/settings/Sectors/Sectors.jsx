import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import SectorTable from './SectorTable';
import { FaPlus } from 'react-icons/fa';
import UseAdminManagement from '../../../../hooks/useAdminManagement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sectors() {
    const [sectors, setSectors] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const { getSectors, deleteSectorById, deleteSubsectorById } = UseAdminManagement();

    useEffect(() => {
        const fetchSectors = async () => {
            const data = await getSectors();
            if (data) {
                setSectors(data);
            } else {
                console.error("No data received");
            }
        };
        fetchSectors();
    }, []);

    const items = [
        { label: 'Overview', icon: 'pi pi-list' },
        { label: 'Manage Sectors', icon: 'pi pi-list' },
        { label: 'Manage Sub sectors', icon: 'pi pi-info-circle' }
    ];

    const handleAddCategory = () => {
        navigate('/admin/settings/sectors/categories');
    };

    const handleDelete = async (id) => {
        try {
            if (activeIndex === 1) {
                await deleteSectorById(id);
                toast.success('Sector deleted successfully');
            } else if (activeIndex === 2) {
                await deleteSubsectorById(id);
                toast.success('Subsector deleted successfully');
            }
            const data = await getSectors();
            setSectors(data);
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    return (
        <div className="card px-2">
            <ToastContainer />
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Sectors Management</h1>
                <button onClick={handleAddCategory} className="bg-green-700 px-4 py-2 text-white rounded-md flex items-center justify-center">
                    <FaPlus className="mr-2" /> Add Category
                </button>
            </div>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 && (
                <SectorTable
                    title="Overview"
                    products={sectors}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    buttons={[]} // No buttons for Overview
                />
            )}
            {activeIndex === 1 && (
                <SectorTable
                    title="Manage Sectors"
                    products={sectors}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    buttons={['delete']} // Only delete button for Manage Sectors
                    onDelete={handleDelete}
                />
            )}
            {activeIndex === 2 && (
                <SectorTable
                    title="Manage Sub sectors"
                    products={sectors}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    buttons={['delete']} // Only delete button for Manage Sub sectors
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}