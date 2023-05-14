import React from 'react'
import {Select, Divider} from 'antd';

export const GroupFormation = () => {
    
    const items = ["name", "status", "role"];

    const  optionsSelect=[
        {
          id: '00001',
          name: 'Arega Lema',
          status:"Assigned",
          role: "Detective"
        },
        {
          id: '00002',
          name: 'Chanyalew Ashagre',
          status:"Assigned",
          role: "Detective"
        },
        {
          id: '00003',
          name: 'Demelash Gebru',
          status:"Assigned",
          role: "Detective"
        },
        {
          id: '00004',
          name: 'Gorfu Sigido',
          status:"Assigned",
          role: "Detective"
        },
        {
          id: '00005',
          name: 'Gemechu Reta',
          status:"Assigned",
          role: "Detective"
        },
        {
          id: '00006',
          name: 'Zeberga Zebarke.',
          status:"Assigned",
          role: "Detective"
        },
        {
          id: '00007',
          name: 'Tayehegn Alebachew',
          status:"Assigned",
          role: "Detective"
        }
      ];

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
          value: item.name,
          label: (
            <div class="grid grid-cols-3">
                <div className='w-1/5'>{item.name}</div>  
                <div className='w-1/5'>  {item.status}</div>
                <div className='w-1/5'>  {item.role}</div>
            </div>          
          ),
      });

    const options = [
        {
          label:renderTitle(items) ,
          options: optionsSelect.map((item)=>{
            return  renderItem(item)
          })
          
        },
       
    ];

    const handleSelect = (value) => {
      console.log(value);
    }

    return (
    <>
    <div className='p-10'>
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
            style={{ padding: '4px 8px', cursor: 'pointer' }}
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