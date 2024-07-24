import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown } from 'react-icons/fa'
import EmploymentCategory from './EmploymentCategory'
import JobCategory from './JobCategory'
import JobLevelCategory from './JobLevelCategory'
import SalaryCategory from './SalaryCategory'

const ChecksCategory = () => {

    return (
        <div>
            <EmploymentCategory />
            <JobCategory />
            <JobLevelCategory />
            <SalaryCategory />
        </div>
    )
}

export default ChecksCategory