import React, {useState, useEffect} from 'react'
import {Select, Divider} from 'antd';

export const GroupFormation = () => {
  const [officers, setOfficers] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/officers/')
      .then(res => res.json())
      .then(data => setOfficers(data))
      .catch(err => console.error(err));
  }, []);


  const items = ["full name", "status", "role"];


  const renderTitle = (header) => (
    <div className='flex w-full  border-b font-bold px-2 mb-2'>
        <table className='flex'>
          <thead>
              <tr className='flex min-w-[150px]'>
                  {
                    header.map((item, index)=>{
                      return(<div className='flex min-w-[160px]  capitalize max-w-1/5' key={index}>
                        <th className='text-red-600 hover:text-green-500  max-w-1/5 flex '>{item}</th>
                      </div>)
                    })
                  }  
              </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    </div>
  );


  const renderItem = (item, length=3) => ({
      value: item.full_name,
      label: (
        <div class="grid grid-cols-3">
            <div className='w-1/5'>{item.full_name}</div>  
            <div className='w-1/5'>  {item.status}</div>
            <div className='w-1/5'>  {item.role}</div>
        </div>          
      ),
  });

    const options = [
        {
          label:renderTitle(items) ,
          options: officers.map((item)=>{
            return  renderItem(item)
          })
          
        },
       
    ];

    const handleSelect = (value) => {
      console.log(value);
    }

    return (
    <>
    <div>
        <Select
            showSearch
            allowClear
            dropdownMatchSelectWidth={500}
            mode='multiple'
            optionLabelProp={"name"}
            autoClearSearchValue
            style={{width: 180}}
            onSelect={handleSelect}
            options={options}
            dropdownRender={menu => (
            <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
            <div
            >
            <div className='flex items-center space-x-3 cursor-pointer '>
            </div>
            </div>
        </div>
        )}
      />
      </div>
    </>
    );
}

export default GroupFormation