import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaArrowLeftLong } from 'react-icons/fa6';

const CurrencyTable = ({ title, currencies, selectedCurrencies, setSelectedCurrencies, onDelete }) => {
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <button className="bg-red-800 text-white px-4 py-2 rounded" onClick={() => onDelete(rowData.id)}>
                    Delete
                </button>
            </div>
        );
    };

    const flagBodyTemplate = (rowData) => {
        return (
            <img
                src={`https://www.countryflags.io/${rowData.countryCode}/flat/32.png`}
                alt={rowData.country}
                style={{ width: '32px', height: '32px' }}
            />
        );
    };

    return (
          <>
            
        <div className="card">
            <h2>{title}</h2>
            <DataTable value={currencies} selectionMode={title !== "Overview" ? "checkbox" : null} selection={selectedCurrencies} onSelectionChange={(e) => setSelectedCurrencies(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                {title !== "Overview" && <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>}
                <Column field="name" header="Name"></Column>
                <Column field="code" header="Code"></Column>
                <Column field="image" header="Image" body={flagBodyTemplate}></Column>
                {title !== "Overview" && <Column header="Actions" body={actionBodyTemplate}></Column>}
            </DataTable>
        </div></>
    );
};

export default CurrencyTable;