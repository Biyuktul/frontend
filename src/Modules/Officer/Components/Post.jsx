import { Button, Dropdown, Form, Input, Menu, Modal, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import TextArea from 'antd/es/input/TextArea';
import EditableTable from './PostTable';
      
const CivilianPost = ({loggedOfficer}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [postListModalVisible, setPostListModalVisible] = useState(false);
  const [data, setData] = useState();
  const [form] = Form.useForm();

  const fetchAllPosts = () => {
    fetch('http://127.0.0.1:8000/post/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data); // You can do further processing with the data here
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect (() => {
    fetchAllPosts();
  }, [])



  const handlePostListEditModalOk = () => {
        setPostListModalVisible(false);
  }

  const handlePostListEditModalCancel = () => {
        setPostListModalVisible(false);
        setEditModalVisible(false);
  };

  const handleMissingModalOk = () => {
    form.validateFields().then(values => {
      values.officer = loggedOfficer.id;
      fetch('http://127.0.0.1:8000/post/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          form.resetFields();
          handlePasswordModalCancel();
        })
        .catch(error => {
          console.error(error);
        });
    });
    setChangePasswordModalVisible(false);
  };
  
  const handlePasswordModalCancel = () => {
    setChangePasswordModalVisible(false);
    setPostListModalVisible(false);
  };

  const handleEdit = (record) => {
        console.log('Editing record:', record);
  };
      
  const handleDelete = (record) => {
        console.log('Deleting record:', record);
  };
  

  const menu = (
    <Menu>
      <Menu.Item key="2" onClick={() => setChangePasswordModalVisible(true)}>
        Post Missing Person
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setPostListModalVisible(true)}>
        View / Edit Posted information
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="text" style={{color: 'white'}}>
           Information To Civilian
        </Button>
      </Dropdown>

      <Modal
        title="Post Missing Person"
        visible={changePasswordModalVisible}
        onCancel={handlePasswordModalCancel}
        onOk={handleMissingModalOk}
        okText="Post"
        okType='primary'
        okButtonProps={{ style: { backgroundColor: '#ff6600', borderColor: '#ff6600' } }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Missing Person Full Name" name="person_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Missing Person Age" name="person_age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Mssing Person Sex"
            name="person_sex"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Missing Person Physical Description" name="person_physical_description" rules={[{ required: true }]}>
            <TextArea />
          </Form.Item>
          <Form.Item label="Missing Person distinguishing features or marks" name="person_distinguishing_features" rules={[{ required: true }]}>
            <TextArea />
          </Form.Item>
          <Form.Item label="Contact information for the officer" name="contact_information" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Post List"
        visible={postListModalVisible}
        onCancel={handlePostListEditModalCancel}
        onOk={handlePostListEditModalOk}
        okButtonProps={{style:{backgroundColor: '#159895'}}}
        width={1600} >
                <EditableTable 
                data={data} 
                setData={setData}
                onEdit={handleEdit} 
                onDelete={handleDelete} />      
      </Modal>
    </>
  );
};

export default CivilianPost;
