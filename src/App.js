import './App.css';
import { AdminDashboard } from './Modules/Admin';
import { OfficerDashboard } from './Modules/Officer';
import Login from  './Modules/Admin/Components/Login';
import { useState } from 'react';
import {BrowserRouter} from 'react-router-dom'
import { Spin } from 'antd';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedOfficer, setLoggedOfficer] = useState({});
  const [loading, setLoading] = useState(false); 

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
  )
  }
  
  if (!isAuthenticated) {
    return <Login handleLogin={handleLogin} setLoggedOfficer={setLoggedOfficer}/>;
  }
  return (
    <BrowserRouter>
      <div className="App">
        {loggedOfficer.role === 'Admin' ? <AdminDashboard setIsAuthenticated={setIsAuthenticated} loggedOfficer={loggedOfficer}/>
          : <OfficerDashboard />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
