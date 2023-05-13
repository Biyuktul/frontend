import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";

const { confirm } = Modal;


const ConfirmPopup = ({selectedEmployee, setOfficers, officers, setSelectedEmployee}) => {
  let status = selectedEmployee.status;

  const fetchOfficers = () => {
    fetch('http://localhost:8000/officers/')
      .then(response => response.json())
      .then(data => {
        setOfficers(data);
      })
      .catch(error => {
        console.error('Error fetching officers:', error);
      });
  }
  
  const handleDeactivate = () => {
    confirm({
      title: `Do you want to ${status === 'suspended' ? 'reactivate' : 'deactivate'} ${selectedEmployee.full_name}?`,
      icon: <ExclamationCircleFilled />,
      content: "You can't reactivate the account once deactivated",
      okType: "default",
      onOk() {
        fetch(`http://localhost:8000/officers/${selectedEmployee.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...selectedEmployee,
            status: status === 'suspended' ? 'active' : 'suspended'
          })
        })
        .then(response => response.json())
        .then(data => {
          setSelectedEmployee({...selectedEmployee, status: data.status});
          fetchOfficers();
        })
        .catch(error => {
          console.error('Error updating officer:', error);
        });
      },
      onCancel() {
        console.log("Do nothing");
      },
    });
  };
  

  return (
    <Space wrap>
        {status === 'suspended' ? (
          <Button type="primary" className="bg-blue-500" style={{pointerEvents: 'auto'}} onClick={() => handleDeactivate()}>Release</Button>
        ) : (
          <Button danger onClick={() => handleDeactivate()}>Suspend</Button>
        )
      }
    </Space>
  );
}

export default ConfirmPopup;
