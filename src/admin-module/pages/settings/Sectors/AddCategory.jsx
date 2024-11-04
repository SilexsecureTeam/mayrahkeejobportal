import React, { useState } from 'react';
import ToggleCheckBox from './../../../components/checkbox/checkbox';

function AddCategory() {
    const [category, setCategory] = useState('');
    const [department, setDepartment] = useState('');
    const [enableSubcategory, setEnableSubcategory] = useState(false);
    const [subdepartment, setSubdepartment] = useState('');

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleDepartmentChange = (e) => setDepartment(e.target.value);
    const handleEnableSubcategoryChange = (e) => setEnableSubcategory(e.value);
    const handleSubdepartmentChange = (e) => setSubdepartment(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({ category, department, enableSubcategory, subdepartment });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Select Category Name</label>
                    <select value={category} onChange={handleCategoryChange} className="w-full px-3 py-2 border rounded-md">
                        <option value="">Select a category Name</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                        <option value="Category 3">Category 3</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Create Department</label>
                    <input
                        type="text"
                        value={department}
                        onChange={handleDepartmentChange}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter department name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Enable Subcategory</label>
                    <p className="text-gray-500 text-sm">
                        If a category has a subcategory, use this button to activate it.
                    </p>
                    <ToggleCheckBox checked={enableSubcategory} onChange={(e) => setEnableSubcategory(e.value)} />
                </div>
                {enableSubcategory && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Select Subdepartment</label>
                        <select value={subdepartment} onChange={handleSubdepartmentChange} className="w-full px-3 py-2 border rounded-md">
                            <option value="">Select a subdepartment</option>
                            <option value="Subdepartment 1">Subdepartment 1</option>
                            <option value="Subdepartment 2">Subdepartment 2</option>
                            <option value="Subdepartment 3">Subdepartment 3</option>
                        </select>
                    </div>
                )}
                <div className="flex justify-end">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Create category</button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;