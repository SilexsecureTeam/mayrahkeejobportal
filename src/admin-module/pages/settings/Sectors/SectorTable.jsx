import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SectorTable = ({ title, products, selectedProducts, setSelectedProducts, buttons }) => {
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                {buttons.includes('change to subcategory') && <button className="bg-blue-800 text-white px-2 py-2 rounded mr-2">Change to Subcategory</button>}
                {buttons.includes('edit') && <button className="bg-purple-500 text-white px-2 py-2 rounded mr-2">Edit</button>}
                {buttons.includes('unset list') && <button className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Unset List</button>}
                {buttons.includes('hide') && <button className="bg-red-800 text-white px-4 py-2 rounded mr-2">Hide</button>}
                {buttons.includes('delete') && <button className="bg-red-800 text-white px-4 py-2 rounded">Delete</button>}
            </div>
        );
    };

    return (
        <div className="card">
            <h2>{title}</h2>
            <DataTable value={products} selectionMode="checkbox" selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="sectorName" header="Sector Name"></Column>
                <Column field="department" header="Department"></Column>
                <Column field="subcategory" header="Subcategory"></Column>
                <Column field="category" header="Category"></Column>
                <Column header="Actions" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default SectorTable;