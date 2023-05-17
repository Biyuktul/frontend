import React from 'react'
import { Select } from 'antd'

const CaseType = ({name, handleChange, options}) => {

  const handleSelectChange = (value) => {
    handleChange(name, value);
  };

  return (
    <div>
      <Select
      style={{
        width: '100%',
      }}
      onChange={handleSelectChange}
      options={options}
      />
    </div>
  )
}

export default CaseType
