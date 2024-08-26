import React, { useState } from 'react'
import Insdustriestype from './Industriestype'
import CompanySizeType from './CompanySizeType'

const CompaniesCategory = ({ setIndustry, setCompanySize }) => {

    return (
        <div>
            <Insdustriestype
                setIndustry={setIndustry}
            />
            <CompanySizeType
                setCompanySize={setCompanySize}
            />
        </div>
    )
}

export default CompaniesCategory