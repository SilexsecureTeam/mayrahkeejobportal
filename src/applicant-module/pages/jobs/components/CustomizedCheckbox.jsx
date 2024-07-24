import React from 'react'

const CustomizedCheckbox = ({values}) => {
    return (
        <div className="flex my-4">
            <input type="checkbox" id={values.id} className="checked:bg-blue-500 checkbox" />
            <label htmlFor={values.id} className="ml-2">{values.label}(3)</label>
        </div>
    )
}

export default CustomizedCheckbox