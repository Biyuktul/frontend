import React from 'react'
import { Select } from 'antd'

const CaseType = ({handleChange, options}) => {
  return (
    <div>
      <Select
      style={{
        width: '100%',
      }}
      onChange={handleChange}
      options={options}
      />
    </div>
  )
}

export default CaseType
