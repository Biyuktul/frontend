import { useState } from 'react';
import { Table, Space, Button, Modal, Input, Select, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
    summary_of_interview: '', // Add the new field
    incident_location_detail: '', // Add the new field
    additional_contacts_witnesses: '', // Add the new field
    officer_remarks: '', 
    images: []
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
    summary_of_interview: '', // Add the new field
    incident_location_detail: '', // Add the new field
    additional_contacts_witnesses: '', // Add the new field
    officer_remarks: '', 
    images: []
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
    summary_of_interview: '', 
    incident_location_detail: '', 
    additional_contacts_witnesses: '',
    officer_remarks: '', 
    images: []
	},
];

const ComplaintList = ({privileges, setSelectedIncident, location, handleLocationClick, statusFilter, handleOk, addVisible, setDetailVisible, setAddVisible, setIncidents}) => {
  const [dataSource, setDataSource] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedComplaintIndex, setSelectedComplaintIndex] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleUpload = (file, index) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newImage = {
        file,
        preview: reader.result,
      };
  
      setDataSource((prevDataSource) => {
        const updatedDataSource = [...prevDataSource];
        updatedDataSource[index].images = updatedDataSource[index].images || [];
        updatedDataSource[index].images.push(newImage); 
        return updatedDataSource;
      });
    };
    
  };

  
  const handleComplaintFieldChange = (field, value) => {
    setDataSource((prevDataSource) => {
      const newData = [...prevDataSource];
      const index = newData.findIndex((item) => item.key === selectedComplaint.key);
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
  };
  
  
  const handleFeedbackChange = (e) => {
      setFeedback(e.target.value);
  };

  const handleRowClick = (record, index) => {
    console.log('record: ' + record, 'index: ' + index)
    setSelectedComplaint(record);
    setSelectedComplaintIndex(index);
    setModalVisible(true);
  };
  

  const handleModalClose = () => {
    setSelectedComplaint(null);
    setSelectedComplaintIndex(null);
    setModalVisible(false);
  };

  const handleApprove = (key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].status = 'Approved';
    newData[index].feedback = feedback; // Add feedback message
    setDataSource(newData);
  };

  const handleDisapprove = (key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].status = 'Disapproved';
    newData[index].feedback = feedback; // Add feedback message
    setDataSource(newData);
  };

  const handleSave = () => {
    console.log(selectedComplaint)
    setModalVisible(false);
    setSelectedComplaint(null);
    setSelectedComplaintIndex(null)
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
      title: 'Summary of Interview',
      dataIndex: 'summary_of_interview',
      key: 'summary_of_interview',
    },
    {
      title: 'Location Details',
      dataIndex: 'incident_location_detail',
      key: 'incident_location_detail',
    },
    {
      title: 'Additional Contacts/Witnesses',
      dataIndex: 'additional_contacts_witnesses',
      key: 'additional_contacts_witnesses',
    },
    {
      title: 'Officer Remarks',
      dataIndex: 'officer_remarks',
      key: 'officer_remarks',
    },
    {
      title: 'Details',
      key: 'details',
      render: (text, record, index) => (
        <Button type="link" onClick={() => handleRowClick(record, index)}>
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
        width={800}
        footer={null} >
            <div className='flex'>
              <div>
                <p>Complainant: {selectedComplaint?.complainant}</p>
                <p>Status: {selectedComplaint?.status}</p>
                <p>Details: {selectedComplaint?.details}</p>
                <p>Summary of Interview:</p>
              </div>
              
                
                <div style={{border: '1px solid gray', overflow: 'scroll', height: '200px'}} className=' w-full flex'>
                    {selectedComplaint?.images && selectedComplaint.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.preview}
                        alt={`Image ${index + 1}`}
                        style={{ width: '180px', height: 'auto', marginBottom: '10px' }}
                      />
                    ))
                    
                    }
                </div>
              
            </div>
            <p>Summary Of Interview</p>
            <Input
              value={selectedComplaintIndex?.summary_of_interview}
              onChange={({target}) => handleComplaintFieldChange('summary_of_interview', target.value)}
            />

            <p>Location Details:</p>
            <Input
              value={selectedComplaintIndex?.incident_location_detail}
              onChange={(e) => handleComplaintFieldChange('incident_location_detail', e.target.value)}
            />

            <p>Additional Contacts/Witnesses:</p>
            <Input
              value={selectedComplaintIndex?.additional_contacts_witnesses}
              onChange={(e) => handleComplaintFieldChange('additional_contacts_witnesses', e.target.value)}
            />

            <p>Officer Remarks:</p>
            <Input
              value={selectedComplaintIndex?.officer_remarks}
              onChange={(e) => handleComplaintFieldChange('officer_remarks', e.target.value)}
            />

            <Upload
              beforeUpload={() => false}
              onChange={(info) =>  handleUpload(info.file, selectedComplaintIndex)}
            >
              <Button icon={<UploadOutlined />}>Upload Evidences File Here</Button>
            </Upload>
          <div style={{ marginBottom: '20px' }}>
            <p>Select a date:</p>
            <DatePicker style={{ width: '100%' }} />
          </div>
          <>
          <p>Feedback:</p>
          <Input value={feedback} onChange={handleFeedbackChange} />
        </>
            <div style={{ marginTop: '20px' }}>
            <Button
  type="primary"
  style={{ backgroundColor: '#05BFDB' }}
  disabled={!privileges.some(privilege => privilege.privilege_name === 'canApproveComplaints')}
  onClick={() => handleApprove(selectedComplaint?.key)}
>
  Approve
</Button>{'      '}
<Button
  danger
  disabled={!privileges.some(privilege => privilege.privilege_name === 'canDisapproveComplaints')}
  onClick={() => handleDisapprove(selectedComplaint?.key)}
>
  Disapprove
</Button>

              <Button type="primary" style={{ backgroundColor: '#05BFDB' }} onClick={handleSave}>
                Save
              </Button>{' '}
            </div>
      </Modal>
    </>
  );
};

export default ComplaintList;
