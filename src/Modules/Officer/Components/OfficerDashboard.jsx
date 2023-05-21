import Sidebar from "../../Admin/Components/Sidebar";
import { Layout, Alert } from 'antd';
import {IoDocumentAttach} from 'react-icons/io5'
import { TbLogout} from 'react-icons/tb'
import {GiPoliceCar} from 'react-icons/gi'
import { PieChartOutlined } from '@ant-design/icons';
import {CgProfile} from 'react-icons/cg'
import {HiOutlineDocumentReport} from 'react-icons/hi'
import MyProfile from "./Profile";
import AppBarMU from "./AppBar";
import Main from "./Main";
import {BsFillPersonBadgeFill} from 'react-icons/bs'
import CampaignIcon from '@mui/icons-material/Campaign';
import CivilianPost from "./Post";
import { useEffect, useState } from "react";

const { Content, Footer } = Layout;

const items = [
        {
          key: '2',
          icon: <IoDocumentAttach />,
          label: 'Case Managment',
          link: '/'
        },
        {
          key: '4',
          icon: <GiPoliceCar />,
          label: 'Incidents',
          link: '/incidents'
        },
        {
          key: '5',
          icon: <HiOutlineDocumentReport />,
          label: 'Reports',
          link: '/reports'
        },
        {
          key: '7',
          icon: <BsFillPersonBadgeFill />,
          label: <CivilianPost />,
        },
        {
          key: '8',
          icon: <CgProfile />,
          label: <MyProfile />,
        },
        {
          key: '9',
          icon: <TbLogout />,
          label: 'Logout',
        },

      ];


const OfficerDashboard = ({loggedOfficer}) => {
  const [privileges, setPrivileges] = useState([]);
  const isSuspended = loggedOfficer.status === 'suspended';
  
  
  useEffect(() => {
    fetch(`http://localhost:8000/privileges/${loggedOfficer.id}/`)
      .then(response => response.json())
      .then(data => {
        setPrivileges(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching privileges:', error);
      });
  }, [loggedOfficer.id]);
        
  return (
    <Layout style={{ height: '100vh' }}>
      {isSuspended ? (
        <Alert
            message="You have been suspended!"
            description="Please contact your administrator for more information."
            type="error"
            showIcon
        />
      ) : (
      <>
      <Sidebar items={items} />
      <Layout className="site-layout" style={{ backgroundColor: '#D8D8FF', paddingLeft: '200px', height: '100%' }}>
        <AppBarMU />
        <Content style={{ height: '100%', overflow: 'auto' }}>
          
            <div style={{ padding: 0, minHeight: 360 }}>
              <Main privileges={privileges}/>
            </div>
      
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#002140', height: 40, color: 'white' }}>
          PSRMS ©2023
        </Footer>
      </Layout>
      </>
      )}
      
    </Layout>
  );
};
export default OfficerDashboard;
