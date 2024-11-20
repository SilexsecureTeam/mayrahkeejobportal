// import React from 'react';

// const SectorDetails = ({ selectedProduct, buttons }) => (
//     <div className="card">
//         <h2>Product Details</h2>
//         {selectedProduct ? (
//             <div>
//                 <p><strong>Code:</strong> {selectedProduct.code}</p>
//                 <p><strong>Name:</strong> {selectedProduct.name}</p>
//                 <p><strong>Category:</strong> {selectedProduct.category}</p>
//                 <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
//                 <div className="actions">
//                     {buttons.includes('edit') && <button className="bg-blue-500 text-white px-2 py-2  mr-2">Edit</button>}
//                     {buttons.includes('delete') && <button className="bg-red-500 text-white px-2 py-2  mr-2">Delete</button>}
//                     {buttons.includes('view') && <button className="bg-blue-500 text-white px-2 py-2  mr-2">View</button>}
//                     {buttons.includes('download') && <button className="bg-yellow-500 text-white px-2 py-2 ">Download</button>}
//                 </div>
//             </div>
//         ) : (
//             <p>No product selected</p>
//         )}
//     </div>
// );

// export default SectorDetails;