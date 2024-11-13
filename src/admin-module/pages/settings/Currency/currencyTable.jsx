import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CurrencyTable = ({ title, currencies, selectedCurrencies, setSelectedCurrencies, buttons }) => {
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                {buttons.includes('edit') && <button className="bg-purple-500 text-white px-2 py-2 rounded mr-2">Edit</button>}
                {buttons.includes('unset list') && <button className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Unset List</button>}
                {buttons.includes('hide') && <button className="bg-red-800 text-white px-4 py-2 rounded mr-2">Hide</button>}
                {buttons.includes('delete') && <button className="bg-red-800 text-white px-4 py-2 rounded">Delete</button>}
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
        <div className="card">
            <h2>{title}</h2>
            <DataTable value={currencies} selectionMode={title !== "Overview" ? "checkbox" : null} selection={selectedCurrencies} onSelectionChange={(e) => setSelectedCurrencies(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                {title !== "Overview" && <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>}
                <Column field="flag" header="Flag" body={flagBodyTemplate}></Column>
                <Column field="code" header="Code"></Column>
                <Column field="symbol" header="Symbol"></Column>
                {title !== "Overview" && <Column header="Actions" body={actionBodyTemplate}></Column>}
            </DataTable>
        </div>
    );
};

export default CurrencyTable;