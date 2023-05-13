import './App.css';
import { AdminDashboard } from './Modules/Admin';
import { OfficerDashboard } from './Modules/Officer';
import Login from  './Modules/Admin/Components/Login';
import { useState } from 'react';
import {BrowserRouter} from 'react-router-dom'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedOfficer, setLoggedOfficer] = useState({});

  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  
  if (!isAuthenticated) {
    return <Login handleLogin={handleLogin} setLoggedOfficer={setLoggedOfficer}/>;
  }
  return (
    <BrowserRouter>
      <div className="App">
        <AdminDashboard setIsAuthenticated={setIsAuthenticated} loggedOfficer={loggedOfficer}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
