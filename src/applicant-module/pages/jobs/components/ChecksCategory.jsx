import React, { useState } from 'react'
import CustomizedCheckbox from './CustomizedCheckbox'
import { FaChevronDown } from 'react-icons/fa'
import EmploymentCategory from './EmploymentCategory'
import JobCategory from './JobCategory'
import JobLevelCategory from './JobLevelCategory'
import SalaryCategory from './SalaryCategory'

const ChecksCategory = ({
    setSalaryRange,
    setEmploymentType,
    setCategory,
    setJobLevel,}
) => {

    return (
        <div>
            <EmploymentCategory setEmploymentType={setEmploymentType} />
            <JobCategory setCategory={setCategory} />
            <JobLevelCategory setJobLevel={setJobLevel} />
            <SalaryCategory setSalaryRange={setSalaryRange} />
        </div>
    )
}

export default ChecksCategory