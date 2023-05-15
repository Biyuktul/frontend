import { useState } from 'react';
import { Table, Space, Button, Modal, Input, Select, DatePicker } from 'antd';

const { Option } = Select;


const data = [
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
    date: '11/11/11',
    status: 'Pending',
    details: 'Lorem ipsum dolor amet.',
	},
  {
		key: '3',
		complainant: 'John Doe',
		type: 'Assault',
		body: 'Lorem ipsum dolor amet.',
    location: 'Kolfe Keranio',
    date: '10/10/10',
    status: 'Pending',
    details: 'Lorem ipsum dolor amet.',
	},
];

const ComplaintList = ({setSelectedIncident, location, handleLocationClick, statusFilter, handleOk, addVisible, setDetailVisible, setAddVisible, setIncidents}) => {
  const [dataSource, setDataSource] = useState(data);
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

  const handleApprove = (key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].status = 'Approved';
    newData[index].feedback = feedback; // Add feedback message
    setDataSource(newData);
    // let the complainant send notification to complainer
  };

  const handleDisapprove = (key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].status = 'Disapproved';
    newData[index].feedback = feedback; // Add feedback message
    setDataSource(newData);
  };

  const columns = [
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
          Details
        </Button>
      ),
    },
    
  ];

  return (
    <>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          pageSize: 6,
        }}
        />
      <Modal
        title="Complaint Details"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <p>Complainant: {selectedComplaint?.complainant}</p>
        <p>Status: {selectedComplaint?.status}</p>
        <p>Details: {selectedComplaint?.details}</p>
          <>
            <p>Feedback:</p>
            <Input value={feedback} onChange={handleFeedbackChange} />
          </>
       
      
      <div style={{ marginBottom: '20px' }}>
        <p>Select a date:</p>
        <DatePicker style={{ width: '100%' }} />
      </div>
        <div style={{ marginTop: '20px' }}>
          <Button type="primary" style={{backgroundColor: '#05BFDB'}} onClick={() => handleApprove(selectedComplaint?.key)}>
            Approve
          </Button>{'      '}
          <Button danger onClick={() => handleDisapprove(selectedComplaint?.key)}>
            Disapprove
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ComplaintList;
