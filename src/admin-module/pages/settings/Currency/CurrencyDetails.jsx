import React from 'react';

const CurrencyDetails = ({ selectedCurrency, buttons }) => (
    <div className="card">
        
        <h2>Currency Details</h2>
        {selectedCurrency ? (
            <div>
                <p><strong>Code:</strong> {selectedCurrency.code}</p>
                <p><strong>Name:</strong> {selectedCurrency.name}</p>
                <p><strong>Symbol:</strong> {selectedCurrency.symbol}</p>
                <p><strong>Exchange Rate:</strong> {selectedCurrency.exchangeRate}</p>
                <p><strong>Country:</strong> {selectedCurrency.country}</p>
                <div className="actions">
                    {buttons.includes('edit') && <button className="bg-blue-500 text-white px-2 py-2 mr-2">Edit</button>}
                    {buttons.includes('delete') && <button className="bg-red-500 text-white px-2 py-2 mr-2">Delete</button>}
                    {buttons.includes('view') && <button className="bg-blue-500 text-white px-2 py-2 mr-2">View</button>}
                    {buttons.includes('download') && <button className="bg-yellow-500 text-white px-2 py-2">Download</button>}
                </div>
            </div>
        ) : (
            <p>No currency selected</p>
        )}
    </div>
);

export default CurrencyDetails;