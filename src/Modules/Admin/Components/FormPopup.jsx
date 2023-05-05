import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Select } from 'antd';
const { Option } = Select;

const PopupFormButton = ({text, formTitle, selectedEmployee, setOfficers, officers}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

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

  const save_to_db = (data) => {
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
  }
  
  const onFinish = (values) => {
    save_to_db(values);
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
            name="full_name"
            rules={[
              {
                required: true,
                message: 'Please fill Full Name!',
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: 'Please fill Phone Number!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Logon Name"
            name="logon_name"
            rules={[
              {
                required: true,
                message: 'please fill Logon Name!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please fill password!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please fill Address!',
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: 'Please fill Role!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Current Status'
            name='status'
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
          >
          <Input />
          </Form.Item>
          <Form.Item
            label="Photo"
            name="photo"
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