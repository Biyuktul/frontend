import { Button, Form, Input, Popover, DatePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import GroupFormation from './GroupFormation';
import CaseType from './CaseType';

const caseOptions = [
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
];

const AddCase = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [caseData, setCaseData] = useState({});
    const [victimData, setVictimData] = useState({});
    const [suspectData, setSuspectData] = useState({});
    const [witnessData, setWitnessData] = useState({});
    const [formData, setFormData] = useState({
      witness_info: {},
      case_info: {},
      suspect_info: {},
      victim_info: {}
    });
    
    const updateFormData = () => {
      const payload = {
        witness_info: witnessData,
        case_info: caseData,
        suspect_info: suspectData,
        victim_info: victimData
      };
      setLoading(true);
      fetch('http://127.0.0.1:8000/case/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          setFormData({
            witness_info: {},
            case_info: {},
            suspect_info: {},
            victim_info: {}
          });
          setWitnessData({});
          setCaseData({});
          setSuspectData({});
          setVictimData({});
          setVisible(false);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
      setFormData(payload);
    };
    
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handleChange = (name, value) => {
    console.log(value)
    switch (name) {
      case 'caseType':
      case 'caseDate':
      case 'casePriority':
      case 'assignTeam':
      case 'caseDescription':
      case 'caseStatus':
      case 'incidentDateTime':
      case 'caseNote':
        setCaseData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;
      case 'victim_name':
      case 'victim_age':
      case 'victim_gender':
      case 'victim_address':
      case 'victim_phone':
      case 'victim_injuries':
      case 'victim_medicalInfo':
      case 'victim_notes':
        setVictimData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;
      case 'suspectFullName':
      case 'suspectAge':
      case 'suspectGender':
      case 'suspectAddress':
      case 'suspectPhone':
      case 'suspectRelationship':
      case 'suspectNotes':
        setSuspectData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;
      case 'witnessFullName':
      case 'witnessAge':
      case 'witnessGender':
      case 'witnessAddress':
      case 'witnessPhone':
        setWitnessData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        break;
      default:
        break;
    }
  };

const content = (
        <div className='grid'>
        <div className="flex w-[1220px] h-[520px] bg-gray-300 overflow-scroll pt-5">
          <div style={{ flex: 1, marginLeft: 10}}>
            <Form>
            <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Case Information</h1>
              <Form.Item label="Case Type">
                <CaseType  options={caseOptions} name="caseType" handleChange={handleChange} /> 
              </Form.Item>
              <Form.Item label="Case Date">
                <Input disabled defaultValue={new Date().toISOString().split('T')[0]} name="caseDate" onChange={(event) => handleChange(event.target.name, event.target.value)} />
              </Form.Item>
              <Form.Item label="Case Priority">
                <CaseType options={priorityOptions} name="casePriority" handleChange={handleChange}/> 
              </Form.Item>
              <Form.Item label="Assign Team">
                <GroupFormation name="assignTeam"  handleChange={handleChange}/>
              </Form.Item>
              <Form.Item label="Case Description">
                <TextArea name="caseDescription" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Case Status">
                <Input disabled defaultValue={"Open"} name="caseStatus" />
              </Form.Item>
              <Form.Item label="Incident Date/Time">
              <DatePicker  format="YYYY-MM-DD" name="incidentDateTime" onChange={(date) => handleChange('incidentDateTime', date)} />
              </Form.Item>
              <Form.Item label="Case Note">
                <TextArea name="caseNote" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>  
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
              <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Victim Information</h1>
              <Form.Item label="Full Name">
                <Input name="victim_name" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Age">
                <Input name="victim_age" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Gender">
                <Input name="victim_gender" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Address">
                <Input name="victim_address" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Phone">
                <Input name="victim_phone" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Injuries">
                <Input name="victim_injuries" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Medical Info">
                <Input name="victim_medicalInfo" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Other Notes">
                <TextArea name="victim_notes" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
            <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Suspect Information</h1>
            <Form.Item label="Full Name">
                <Input name="suspectFullName" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Age">
                <Input name="suspectAge" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Gender">
                <Input name="suspectGender" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Address">
                <Input name="suspectAddress" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Phone">
                <Input name="suspectPhone" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="suspect Relationship">
                <Input name="suspectRelationship" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Other Notes">
                <TextArea name="suspectNotes" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1, marginLeft: 30}}>
            <Form>
            <h1 style={{textAlign: 'center', marginBottom: '15px', fontSize: '20px'}}>Witness Information</h1>
            <Form.Item label="Full Name">
                <Input name="witnessFullName" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Age">
                <Input name="witnessAge" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Gender">
                <Input name="witnessGender" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Address">
                <Input name="witnessAddress" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
              <Form.Item label="Phone">
                <Input name="witnessPhone" onChange={(event) => handleChange(event.target.name, event.target.value)}/>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div style={{  }}>
        <Button style={{ marginRight: 8, backgroundColor: 'tomato' }}  type='primary' onClick={updateFormData} loading={loading} disabled={loading}>
          Open
        </Button>
        <Button  type='primary' style={{marginRight: 8, backgroundColor: 'tomato'}}>
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
        <Button  style={{marginTop: '20px', backgroundColor: '#1677ff', }} >Open New Case</Button>
        </Popover>
      </div>
      {visible && <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} />}
    </div>
  );
};

export default AddCase;