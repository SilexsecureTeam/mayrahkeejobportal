// import './checkbox.css'
// function ToggleCheckBox() {
//     return (
//         <>
//             <label class="switch">
//                 <input type="checkbox"  />
//                     <span class="slider round"></span>
//             </label>
//         </>
//     )
// }

// export default ToggleCheckBox


import React, { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";

export default function ToggleCheckBox({ checked, onChange }) {
    return (
        <div className="card flex justify-content-center text-green-300">
            <InputSwitch checked={checked} onChange={onChange} className=" text-green-700"/>
        </div>
    );
}