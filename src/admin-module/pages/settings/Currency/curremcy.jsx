import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CurrencyTable from './currencyTable';
import CurrencyDetails from './currencyDetails';
// import { ProductService } from './service/ProductService';

const sampleData1 = [
    { id: 1, currencyName: 'US Dollar', symbol: 'USD', exchangeRate: 1.0, country: 'United States', countryCode: 'US' },
    { id: 2, currencyName: 'Euro', symbol: 'EUR', exchangeRate: 0.85, country: 'Eurozone', countryCode: 'EU' },
];

const sampleData2 = [
    { id: 1, currencyName: 'Japanese Yen', symbol: 'JPY', exchangeRate: 110.0, country: 'Japan', countryCode: 'JP' },
    { id: 2, currencyName: 'British Pound', symbol: 'GBP', exchangeRate: 0.75, country: 'United Kingdom', countryCode: 'GB' },
];

export default function Currency() {
    const [currencies1, setCurrencies1] = useState(sampleData1);
    const [currencies2, setCurrencies2] = useState(sampleData2);
    const [selectedCurrencies, setSelectedCurrencies] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const items = [
        { label: 'Overview', icon: 'pi pi-list' },
        { label: 'Manage Currency', icon: 'pi pi-list' },
    ];

    const handleAddCurrency = () => {
        navigate('/admin/settings/currency/add');
    };

    return (
        <div className="card px-2">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Currency Management</h1>
                <button onClick={handleAddCurrency} className="bg-green-700 px-4 py-2 text-white rounded-md flex items-center justify-center">
                    <FaPlus className="mr-2" /> Add Currency
                </button>
            </div>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 && (
                <CurrencyTable
                    title="Overview"
                    currencies={currencies1}
                    selectedCurrencies={selectedCurrencies}
                    setSelectedCurrencies={setSelectedCurrencies}
                    buttons={['edit', 'unset list', 'hide', 'delete']}
                />
            )}
            {activeIndex === 1 && (
                <CurrencyTable
                    title="Manage Currency"
                    currencies={currencies2}
                    selectedCurrencies={selectedCurrencies}
                    setSelectedCurrencies={setSelectedCurrencies}
                    buttons={['edit', 'unset list', 'hide', 'delete']}
                />
            )}
            {activeIndex === 2 && (
                <CurrencyDetails selectedCurrency={selectedCurrencies ? selectedCurrencies[0] : null} buttons={['edit', 'delete', 'view', 'download']} />
            )}
        </div>
    );
}