import { Popover, Divider } from 'antd';

import React from 'react'

function IconPopover({title, data, Icon}) {
  return (
    <Popover 
      title={title}
      content={
        Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              {item}
              {index !== data.length - 1 && <Divider style={{ margin: '8px 0', backgroundColor: 'lightGray' }}/>}
            </div>
          ))
        ) : (
          <div>No notifications</div>
        )
      }
    >
        {Icon}
    </Popover>
  )
}

export default IconPopover
