import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import SectorTable from './SectorTable';
import SectorDetails from './SectorDetails';
import { FaPlus } from 'react-icons/fa';
// import { ProductService } from './service/ProductService';

const sampleData1 = [
    { id: 1, sectorName: 'Sector A1', department: 'Department 1', subcategory: 'Subcategory 1', category: 'Category 1', quantity: 10 },
    { id: 2, sectorName: 'Sector A2', department: 'Department 1', subcategory: 'Subcategory 1', category: 'Category 1', quantity: 20 },
];

const sampleData2 = [
    { id: 1, sectorName: 'Sector B1', department: 'Department 2', subcategory: 'Subcategory 2', category: 'Category 2', quantity: 30 },
    { id: 2, sectorName: 'Sector B2', department: 'Department 2', subcategory: 'Subcategory 2', category: 'Category 2', quantity: 40 },
];

const sampleData3 = [
    { id: 1, sectorName: 'Sector C1', department: 'Department 3', subcategory: 'Subcategory 3', category: 'Category 3', quantity: 50 },
    { id: 2, sectorName: 'Sector C2', department: 'Department 3', subcategory: 'Subcategory 3', category: 'Category 3', quantity: 60 },
];

export default function Sectors() {
    const [products1, setProducts1] = useState(sampleData1);
    const [products2, setProducts2] = useState(sampleData2);
    const [products3, setProducts3] = useState(sampleData3);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const items = [
        { label: 'Overview', icon: 'pi pi-list' },
        { label: 'Manage Categories', icon: 'pi pi-list' },
        { label: 'Manage Departments', icon: 'pi pi-list' },
        { label: 'Manage Subcategories', icon: 'pi pi-info-circle' }
    ];

    const handleAddCategory = () => {
        navigate('/admin/settings/sectors/categories');
    };

    return (
        <div className="card px-2">
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
                    products={products1}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    buttons={['change to subcategory', 'edit', 'unset list', 'hide', 'delete']}
                />
            )}
            {activeIndex === 1 && (
                <SectorTable
                    title="Manage Categories"
                    products={products2}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    buttons={['edit', 'Hide']}
                />
            )}
            {activeIndex === 2 && (
                <SectorTable
                    title="Manage Departments"
                    products={products3}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    buttons={['delete', 'download']}
                />
            )}
            {activeIndex === 3 && (
                <SectorDetails selectedProduct={selectedProducts ? selectedProducts[0] : null} buttons={['edit', 'delete', 'view', 'download']} />
            )}
        </div>
    );
}