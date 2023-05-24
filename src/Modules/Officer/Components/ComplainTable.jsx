import { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Input, Select, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;


const ComplaintList = ({privileges, handleLocationClick, loggedOfficer}) => {
  const [dataSource, setDataSource] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedComplaintIndex, setSelectedComplaintIndex] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/complaint/')
      .then(res => res.json())
      .then(data => setDataSource(data))
      .catch(err => console.error(err));
  }, []);

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
    console.log(selectedComplaint)
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].complaint_status = 'Approved';
    newData[index].feedback = feedback;
    setDataSource(newData);
    fetch(`http://127.0.0.1:8000/complaint/${selectedComplaint.complaint_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        complaint_status: 'Approved',
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Complaint status updated:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleDisapprove = (key) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    newData[index].complaint_status = 'Disapproved';
    newData[index].feedback = feedback; 
    setDataSource(newData);
    fetch(`http://127.0.0.1:8000/complaint/${selectedComplaint.complaint_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        complaint_status: 'Disapproved',
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Complaint status updated:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSave = () => {
    fetch('http://127.0.0.1:8000/fir/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "summary_of_interview": selectedComplaint.summary_of_interview,
          "incident_location_detail": selectedComplaint.incident_location_detail,
          "additional_contacts_witnesses": selectedComplaint.additional_contacts_witnesses,
          "officer_remark": selectedComplaint.officer_remarks,
          "officer": loggedOfficer.id,
          "civilian": selectedComplaint.civilian_id
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    setModalVisible(false);
    setSelectedComplaint(null);
    setSelectedComplaintIndex(null)
  };


  const columns = [
    {
      title: 'Complainant',
      dataIndex: 'civilian_name',
      key: 'complainant',
    },
    {
      title: 'Complaint Type',
      dataIndex: 'complaint_type',
      key: 'type',
    },
    {
      title: 'Complain Body',
      dataIndex: 'complaint_body',
      key: 'body',
    },
    {
      title: 'Location',
      dataIndex: 'complaint_location',
      key: 'location',
      render: (text, record) => <a onClick={() => handleLocationClick(record)}>{text}</a>,
    },
    {
      title: 'Complain Date',
      dataIndex: 'complaint_date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'complaint_status',
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
              <div className='w-[250px]'>
                <p>Complainant: {selectedComplaint?.civilian_name}</p>
                <p>Status: {selectedComplaint?.complaint_status}</p>
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
