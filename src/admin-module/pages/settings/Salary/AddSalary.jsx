import React, { useState } from 'react';
import UseAdminManagement from '../../../../hooks/useAdminManagement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function AddSalary() {
    const [amount, setAmount] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { createSalary } = UseAdminManagement();
    const navigate = useNavigate();

    const handleAmountChange = (e) => setAmount(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const salaryData = { amount };
            const result = await createSalary(salaryData);
            console.log(result);

            if (result) {
                toast.success('Salary created successfully');
                console.log('Salary created successfully', result);
                setTimeout(() => {
                    navigate('/admin/settings/salary');
                }, 2000); // Delay navigation by 2 seconds
            } else {
                toast.error('Failed to create salary');
            }
        } catch (error) {
            toast.error('Error creating salary');
            console.error('Error creating salary:', error);
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
                <h2 className="text-2xl font-bold mb-4">Add Salary</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Amount</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter amount"
                        />
                    </div>
                   
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Salary'}
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

