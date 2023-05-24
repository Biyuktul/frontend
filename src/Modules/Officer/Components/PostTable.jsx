import React, { useState } from "react";
import { Table, Input, Popconfirm, Form, Button } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({data, setData}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
    form.setFieldsValue({
      name: "",
      ...record,
    });
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
  
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        console.log(newData[index].report_id)
        // Prepare the data for the PUT request
        const requestBody = {
          ...item,
          ...row,
        };
  
        // Send the PUT request
        await fetch(`http://127.0.0.1:8000/post/update/${newData[index].post_id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
        {
          title: "Officer Name",
          dataIndex: "name",
          editable: false,
          width: 115,
        },
        {
          title: "Post Date",
          dataIndex: "post_date",
          editable: false,
          width: 110,
        },
        {
          title: "Missing Person Name",
          dataIndex: "person_name",
          editable: true,
          width: 130,
        },
        {
          title: "Missing Person Sex",
          dataIndex: "person_sex",
          editable: true,
          width: 80,
        },
        {
          title: "Missing Person Age",
          dataIndex: "person_age",
          editable: true,
          width: 40,
        },
        {
          title: "Missing Person Physical Description",
          dataIndex: "person_physical_description",
          editable: true,
        },
        {
          title: "Missing Person Marks",
          dataIndex: "person_distinguishing_features",
          editable: true,
        },
        {
          title: "Contact Information",
          dataIndex: "contact_information",
          editable: true,
        },
        {
          title: "Action",
          dataIndex: "operation",
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                  Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <span>
                <Button type="primary" style={{backgroundColor: '#159895'}} disabled={editingKey !== ""} onClick={() => edit(record)}>
                  Edit
                </Button>{"   "}
                |{"   "}
                <Popconfirm
              title="Are you sure to delete this Post?"
              okButtonProps={{ style: { backgroundColor: "#159895" } }}
              onConfirm={async () => {
                const newData = [...data];
                const index = newData.findIndex((item) => record.key === item.key);
                newData.splice(index, 1);
                setData(newData);
            
                // Send the DELETE request
                await fetch(`http://127.0.0.1:8000/post/delete/${newData[index].post_id}/`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
              </span>
            );
          },
        },
      ];
      

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          pageSize: 5,
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
