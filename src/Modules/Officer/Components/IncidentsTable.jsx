import { PlusOutlined } from '@ant-design/icons';
import NewIncident from './NewIncident';
import { useState } from 'react';
import {  Tag, Popover, Input, Table, Space, Button, Modal, Select, DatePicker } from 'antd';
const { Option } = Select;


const incidents = [
  {
		key: '1',
		complainant: 'John Doe',
		type: 'Assault',
		body: 'Lorem ipsum dolor amet.',
    location: 'Unity University',
    date: '12/11/11',
    status: 'Pending',
    details: 'Lorem ipsum dolor amet.',
	},
	{
		key: '2',
		complainant: 'John Doe',
		type: 'Assault',
		body: 'Lorem ipsum dolor amet.',
    location: 'Arat Kilo',
    status: 'Pending',
    details: 'Lorem ipsum dolor amet.',
	},
  {
		key: '3',
		complainant: 'John Doe',
		type: 'Assault',
		body: 'Lorem ipsum dolor amet.',
    location: 'Kolfe Keranio',
    status: 'Pending',
    details: 'Lorem ipsum dolor amet.',
	},
];

const IncidentsTable = ({  setSelectedIncident, location, handleLocationClick, statusFilter, handleOk, addVisible, setDetailVisible, setAddVisible, setIncidents }) => {
  const [searchText, setSearchText] = useState('');
  const [dataSource, setDataSource] = useState(incidents);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
      setFeedback(e.target.value);
  };

  const handleRowClick = (record) => {
    setSelectedComplaint(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleApprove = (record) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => record.key === item.key);
    newData[index] = { ...newData[index], status: 'Approved', feedback: feedback };
    setDataSource(newData);
  };
  

const handleDisapprove = (record) => {
  const newData = [...dataSource];
  const index = newData.findIndex((item) => record.key === item.key);
  newData[index].status = 'Disapproved';
  newData[index].feedback = feedback; // Add feedback message
  setDataSource(newData);
};
  
  const newColumn = [
      {
        title: 'Complainant',
        dataIndex: 'complainant',
        key: 'complainant',
      },
      {
        title: 'Complaint Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Complain Body',
        dataIndex: 'body',
        key: 'body',
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: (text, record) => <a onClick={() => handleLocationClick(record)}>{text}</a>,
      },
      {
        title: 'Complain Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Details',
        key: 'details',
        render: (text, record) => (
          <Button type="link" onClick={() => handleRowClick(record)}>
            {console.log(record)}
            Details
          </Button>
        ),
      },
      
    
  
  ]
  const handleSearch = (value) => {
		setSearchText(value);
	};

  const filteredData = incidents.filter((record) => {
		const caseType = record.type.toLowerCase();
		const search = searchText.toLowerCase();
		return caseType.includes(search) && (statusFilter === 'All' || record.status === statusFilter);
  	});



	const handleVisibleChange = (visible) => {
		setAddVisible(visible);
	};


  const content = (
        <NewIncident 
        setIncidents={setIncidents}
        setAddVisible={setAddVisible}
        incidents={incidents}
        handleOk={handleOk}/>
      );
  
  const searchInput = (
    <Input.Search
          placeholder="Search by case type"
          allowClear 
          onChange={(e) => handleSearch(e.target.value)} 
          style={{width: 450, marginTop: 20}}
    />
  );

  const addButton = (
    <Popover content={content} title="Add Incident" trigger="click" visible={addVisible} onVisibleChange={handleVisibleChange}>
          <Button 
            type={'primary'} 
            icon={<PlusOutlined />} 
            style={{width: '50px', 
            backgroundColor: '#1677ff', 
            marginTop: 20,
            marginLeft: 10
          }}
          />
    </Popover>
  );

  return (
    <>
    <Table
          title={() => (
            <Space>
              {searchInput}
              {addButton}
            </Space>
          )}
          dataSource={filteredData}
          columns={newColumn}

      pagination={{
        pageSize: 6,
      }}
      rowKey="key"
    />

<Modal
        title="Complaint Details"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <p>Complaint: {selectedComplaint?.complaint}</p>
        <p>Complainant: {selectedComplaint?.complainant}</p>
        <p>Status: {selectedComplaint?.status}</p>
        <p>Details: {selectedComplaint?.details}</p>
        {selectedComplaint?.status === 'Disapproved' && ( // Show feedback input if the complaint is disapproved
          <>
            <p>Feedback:</p>
            <Input value={feedback} onChange={handleFeedbackChange} />
          </>
        )}
      <div style={{ marginBottom: '20px' }}>
        <p>Select a branch station:</p>
        <Select style={{ width: '100%' }} placeholder="Select a branch station">
        <Option value="branch1">Branch 1</Option>
        <Option value="branch2">Branch 2</Option>
        <Option value="branch3">Branch 3</Option>
        </Select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p>Select a date:</p>
        <DatePicker style={{ width: '100%' }} />
      </div>
        <div style={{ marginTop: '20px' }}>
        <Button type="primary" style={{backgroundColor: '#05BFDB'}} onClick={() => handleApprove(selectedComplaint)}>
  Approve
</Button>{'      '}
<Button danger onClick={() => handleDisapprove(selectedComplaint)}>
  Disapprove
</Button>

        </div>
      </Modal>
    </>
  );
};

export default IncidentsTable;
