import Main from './Main';
import AppBarMU from "./AppBar";
import Sidebar from './Sidebar';
import { useState } from 'react';
import { Layout } from 'antd';
import {MdOutlineGroups} from 'react-icons/md'
import {TbReport, TbSettings, TbLogout} from 'react-icons/tb'
import { PieChartOutlined } from '@ant-design/icons';
import MyProfile from './Profile';


const { Content, Footer } = Layout;

const AdminDashboard = ({setIsAuthenticated, loggedOfficer}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(['']);
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Overview',
      link: '/'
    },
    {
      key: '2',
      icon: <MdOutlineGroups />,
      label: 'Officers',
      link: '/officers'
    },
  
    {
      key: '4',
      icon: <TbSettings />,
      label: <MyProfile loggedOfficer={loggedOfficer}/>,
      
    },
    {
      key: '5',
      icon: <TbLogout />,
      label: <a href="#" onClick={handleLogout}>Logout</a>,
    
    }
  ];


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} items={items}/>
      <Layout className="site-layout" style={{backgroundColor: '#D8D8FF',paddingLeft: '200px', height: '100%'}}>
        <AppBarMU notifications={notifications}/>
        <Content style={{height: '100%', overflow: 'auto'}}>
          <div style={{ padding: 0, minHeight: 360 }}>
            {<Main setNotifications={setNotifications} notifications={notifications}/>}
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};
export default AdminDashboard;