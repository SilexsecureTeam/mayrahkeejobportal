import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SalaryTable = ({ title, products, selectedProducts, setSelectedProducts, buttons, onDelete }) => {
    const [loadingId, setLoadingId] = useState(null);

    const handleDelete = async (id) => {
        setLoadingId(id);
        await onDelete(id);
        setLoadingId(null);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                {buttons.includes('edit') && <button className="bg-purple-500 text-white px-2 py-2 rounded mr-2">Edit</button>}
                {buttons.includes('delete') && (
                    <button className="bg-red-800 text-white px-4 py-2 rounded" onClick={() => handleDelete(rowData.id)} disabled={loadingId === rowData.id}>
                        {loadingId === rowData.id ? 'Deleting...' : 'Delete'}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="card">
            <h2>{title}</h2>
            <DataTable value={products} selectionMode={title === 'Overview' ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                {title !== 'Overview' && <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>}
                <Column field="name" header="Salary Name"></Column>
                <Column field="amount" header="Amount"></Column>
                {title !== 'Overview' && <Column header="Actions" body={actionBodyTemplate}></Column>}
            </DataTable>
        </div>
    );
};

export default SalaryTable;