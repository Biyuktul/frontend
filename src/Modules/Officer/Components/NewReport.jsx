import React, { useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';

const { Option } = Select;

const NewReport = ({loggedOfficer}) => {
  const [open, setOpen] = useState(false);
  const [announcementType, setAnnouncementType] = useState('');
  const [announcementBody, setAnnouncementBody] = useState('');

  const handleOk = () => {
    
    console.log('Announcement Type:', announcementType);
    console.log('Announcement Body:', announcementBody);
    const payload = {
        report_type: announcementType,
        report_body: announcementBody,
        officer: loggedOfficer.id,
    };
    
    fetch('http://127.0.0.1:8000/reports/create/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
        console.log('Announcement sent successfully');
        } else {
        console.error('Failed to send announcement');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ backgroundColor: '#47A992', width: '16rem', marginBottom: '10px' }}
        onClick={() => setOpen(true)}
      >
        Write Report
      </Button>
      <Modal
        title="Write Report"
        centered
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <form>
          <div>
            <label>Anouncement Type:</label>
            <Select value={announcementType} style={{width: '200px'}} onChange={value => setAnnouncementType(value)}>
              <Option value="training">Training Announcement</Option>
              <Option value="general">General Announcement</Option>
              <Option value="safety">Safety Announcement</Option>
            </Select>
          </div>
          <div>
            <label>Anouncement Body:</label>
            <Input value={announcementBody} onChange={e => setAnnouncementBody(e.target.value)} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewReport;
