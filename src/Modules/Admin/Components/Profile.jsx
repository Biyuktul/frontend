import { Avatar, Button, Dropdown, Form, Input, Menu, Modal, Upload } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { confirm } = Modal;

const MyProfile = ({loggedOfficer}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [logonName, setLogonName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleEditModalOk = async () => {
    const response = await fetch(`http://127.0.0.1:8000/officers/${loggedOfficer.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        phone_number: phoneNumber,
        logon_name: logonName,
        password: loggedOfficer.password,
        address: loggedOfficer.address,
        status: loggedOfficer.status,
        role: loggedOfficer.role,
        team: loggedOfficer.team,
        rank: loggedOfficer.rank,
      })
    })
    if (response.ok) {
      console.log("Success")
    }
    setEditModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handlePasswordModalOk = () => {
    // Handle change password submit
    setChangePasswordModalVisible(false);
  };

  const handlePasswordModalCancel = () => {
    setChangePasswordModalVisible(false);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setEditModalVisible(true)}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setChangePasswordModalVisible(true)}>
        Change Password
      </Menu.Item>
      <Menu.Divider />

    </Menu>
  );

  const initialValues = {
    fullname: loggedOfficer.full_name,
    logonname: loggedOfficer.logon_name,
    phonenumber: loggedOfficer.phone_number
  }

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="text" style={{color: 'white'}}>
           My Profile
        </Button>
      </Dropdown>


      <Modal
        title="Edit Profile"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
        okText="Save Changes"
        okButtonProps={{ style: { backgroundColor: '#ff6600', borderColor: '#ff6600' } }}

      >
        
        <Form layout="vertical" initialValues={initialValues}>
          <Form.Item label="Full Name" name="fullname">
            <Input onClick={({target}) => setFullName(target.value)}/>
          </Form.Item>
          <Form.Item label="Logon Name" name="logonname">
            <Input onClick={({target}) => setLogonName(target.value)} />
          </Form.Item>
          <Form.Item label="Phone Number" name="phonenumber">
            <Input onClick={({target}) => setPhoneNumber(target.value)}/>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Change Password"
        visible={changePasswordModalVisible}
        onCancel={handlePasswordModalCancel}
        onOk={handlePasswordModalOk}
        okText="Save Changes"
        okType='primary'
        okButtonProps={{ style: { backgroundColor: '#ff6600', borderColor: '#ff6600' } }}
      >
        <Form layout="vertical">
          <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            rules={[{ required: true }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyProfile;
