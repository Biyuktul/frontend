import { Button, Form, Input, Popover, DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import GroupFormation from './GroupFormation';
import CaseType from './CaseType';

const caseOptions = [
  {
    value: 'Type',
  },
  {
    value: 'Theft',
    label: 'Theft',
  },
  {
    value: 'Assault',
    label: 'Assault',
  },
  {
    value: 'Robbery',
    label: 'Robbery',
  },
  {
    value: 'Burglary',
    label: 'Burglary',
  },
  {
    value: 'Homicide',
    label: 'Homicide',
  },
  {
    value: 'Fraud',
    label: 'Fraud',
  },
  {
    value: 'Drug-related offenses',
    label: 'Drug-related offenses',
  },
  {
    value: 'Cybercrime',
    label: 'Cybercrime',
  },
  {
    value: 'Domestic violence',
    label: 'Domestic violence',
  },
  {
    value: 'Traffic violations',
    label: 'Traffic violations',
  },
  {
    value: 'Missing person',
    label: 'Missing person',
  },
  {
    value: 'Harassment',
    label: 'Harassment',
  },
  {
    value: 'Vandalism',
    label: 'Vandalism',
  },
  {
    value: 'Sexual assault',
    label: 'Sexual assault',
  },
  {
    value: 'Child abuse',
    label: 'Child abuse',
  },
];

const priorityOptions = [
  {
    value: 'Type',
    label: 'Select Case Priority',
  },
  {
    value: 'High',
    label: 'High Priority',
  },
  {
    value: 'Medium',
    label: 'Medium Priority',
  },
  {
    value: 'Low',
    label: 'Low Priority',
  },
]
const AddCase = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handleCancle = () => {
        setVisible(false)
  }

  const handleChange = () => {

  }
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  const onChange = () => {

  }
const content = (
        <div className='grid'>
        <div className="flex w-[1220px] h-[520px] bg-gray-300 overflow-scroll pt-5">
          <div style={{ flex: 1, marginLeft: 10}}>
            <Form>
            <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Case Information</h1>
              <Form.Item label="Case Type">
                <CaseType handleChange={handleChange} options={caseOptions}/> 
              </Form.Item>
              <Form.Item label="Case Date">
                <Input disabled defaultValue={new Date().toISOString().split('T')[0]}/>
              </Form.Item>
              <Form.Item label="Case Priority">
                <CaseType handleChange={handleChange} options={priorityOptions}/> 
              </Form.Item>
              <Form.Item label="Assign Team">
                <GroupFormation />
              </Form.Item>
              <Form.Item label="Case Description">
                <TextArea />
              </Form.Item>
              <Form.Item label="Case Status">
                <Input disabled defaultValue={"New"}/>
              </Form.Item>
              <Form.Item label="Incident Date/Time">
              <DatePicker showTime onChange={onChange} onOk={onOk} />
              </Form.Item>
              <Form.Item label="Case Note">
                <TextArea />
              </Form.Item>  
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
              <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Victim Information</h1>
              <Form.Item label="Full Name">
                <Input />
              </Form.Item>
              <Form.Item label="Age">
                <Input />
              </Form.Item>
              <Form.Item label="Gender">
                <Input />
              </Form.Item>
              <Form.Item label="Address">
                <Input />
              </Form.Item>
              <Form.Item label="Phone">
                <Input />
              </Form.Item>
              <Form.Item label="Injuries">
                <Input />
              </Form.Item>
              <Form.Item label="Medical Info">
                <Input />
              </Form.Item>
              <Form.Item label="Other Notes">
                <TextArea />
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
            <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Suspect Information</h1>
            <Form.Item label="Full Name">
                <Input />
              </Form.Item>
              <Form.Item label="Age">
                <Input />
              </Form.Item>
              <Form.Item label="Gender">
                <Input />
              </Form.Item>
              <Form.Item label="Address">
                <Input />
              </Form.Item>
              <Form.Item label="Phone">
                <Input />
              </Form.Item>
              <Form.Item label="suspect Relationship">
                <Input />
              </Form.Item>
              <Form.Item label="Other Notes">
                <TextArea />
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
            <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Witness Information</h1>
            <Form.Item label="Full Name">
                <Input />
              </Form.Item>
              <Form.Item label="Age">
                <Input />
              </Form.Item>
              <Form.Item label="Gender">
                <Input />
              </Form.Item>
              <Form.Item label="Address">
                <Input />
              </Form.Item>
              <Form.Item label="Phone">
                <Input />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div style={{  }}>
        <Button style={{ marginRight: 8, backgroundColor: 'tomato' }}  type='primary'>
          Open
        </Button>
        <Button onClick={handleCancle} type='primary' style={{marginRight: 8, backgroundColor: 'tomato'}}>
          Cancel
        </Button>
      </div>
        </div>
      );
  
  return (
    <div style={{}}>
      <div style={{ marginLeft: 50, whiteSpace: 'nowrap' }}>
        <Popover
          placement="bottom"
          title="Open New Case"
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          destroyTooltipOnHide={true}
        >
        <Button icon={<PlusOutlined />} style={{marginTop: '20px', backgroundColor: '#1677ff', width: '50px', }}/>
        </Popover>
      </div>
      {visible && <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} />}
    </div>
  );
};

export default AddCase;