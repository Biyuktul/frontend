import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Select } from 'antd';
const { Option } = Select;

const PopupFormButton = ({text, formTitle, selectedEmployee, setOfficers, notifications, setNotifications}) => {
  const [o_id, setOid] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [logonName, setLogonName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [team, setTeam] = useState('');
  const [rank, setRank] = useState('');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedEmployee) {
      setOid(selectedEmployee.id);
      setFullName(selectedEmployee.full_name);
      setPhoneNumber(selectedEmployee.phone_number);
      setLogonName(selectedEmployee.logon_name);
      setPassword(selectedEmployee.password);
      setAddress(selectedEmployee.address);
      setStatus(selectedEmployee.status);
      setRole(selectedEmployee.role);
      setTeam(selectedEmployee.team);
      setRank(selectedEmployee.rank);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    if (selectedEmployee) {
      form.setFieldsValue({
        o_id: selectedEmployee.id,
        full_name: selectedEmployee.full_name,
        phone_number: selectedEmployee.phone_number,
        role: selectedEmployee.role,
        logon_name: selectedEmployee.logon_name,
        password: selectedEmployee.password,
        address: selectedEmployee.address,
        rank: selectedEmployee.rank,
      });
    }
  }, [selectedEmployee, form]);

  const handleAdd = (data) => {
    fetch("http://127.0.0.1:8000/officers/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    setNotifications([...notifications, "Succesfuly added officer "+data.full_name ])
  }

  const handleEdit = async (data) => {
    const response = await fetch(`http://127.0.0.1:8000/officers/${o_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        phone_number: phoneNumber,
        logon_name: logonName,
        password: password,
        address: address,
        status: status,
        role: role,
        team: team,
        rank: rank,
      })
    })
    if (response.ok) {
      console.log("Success")
    }
  }

  const onFinish = (values) => {
    
    formTitle === 'Edit Officer Form' ? handleEdit(values) : handleAdd(values);
    fetch('http://127.0.0.1:8000/officers/')
      .then(res => res.json())
      .then(data => setOfficers(data))
      .catch(err => console.error(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = (values) => {
    console.log('Received values of form:', values);
    setVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <>
      <Button style={{backgroundColor: '#05BFDB'}} onClick={() => setVisible(true)}>{text}</Button>
      <Modal
        visible={visible}
        title={formTitle}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type='primary'
            style={{backgroundColor: '#05BFDB'}}
            form="myForm"
            onClick={handleOk}
          >
            Add
          </Button>,
        ]}
      >
        <Form form={form}
          {...layout}
          name="myForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Full Name"
            key={1}
            name="full_name"
            rules={[
              {
                required: true,
                message: 'Please fill Full Name!',
              },
            ]}
          >
            <Input onChange={(e) => setFullName(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            key={2}
            rules={[
              {
                required: true,
                message: 'Please fill Phone Number!',
              },
            ]}
          >
            <Input onChange={(e) => setPhoneNumber(e.target.value)}/>

          </Form.Item>
          <Form.Item
            label="Logon Name"
            name="logon_name"
            key={3}
            rules={[
              {
                required: true,
                message: 'please fill Logon Name!',
              },
            ]}
          >
            <Input onChange={(e) => setLogonName(e.target.value)}/>

          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            key={4}
            rules={[
              {
                required: true,
                message: 'Please fill password!',
              },
            ]}
          >
            <Input onChange={(e) => setPassword(e.target.value)}/>

          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            key={5}
            rules={[
              {
                required: true,
                message: 'Please fill Address!',
              },
            ]}
          >
            <Input onChange={(e) => setAddress(e.target.value)}/>

          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            key={6}
            rules={[
              {
                required: true,
                message: 'Please fill Role!',
              },
            ]}
          >
            <Input onChange={(e) => setRole(e.target.value)}/>

          </Form.Item>
          <Form.Item
            label='Current Status'
            name='status'
            key={7}
          >
            <Select  defaultValue={'Active'} disabled>
              <Option value="1">Active</Option>
              <Option value="2">Case Assigned</Option>
              <Option value="3">Training</Option>
              <Option value="4">Sick Leave</Option>
              <Option value="5">Suspended</Option>
              <Option value="6">Retired</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Rank"
            name="rank"
            key={8}
          >
          <Input onChange={(e) => setRank(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Photo"
            name="photo"
            key={9}
          >
            <Upload>
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


export default PopupFormButton;