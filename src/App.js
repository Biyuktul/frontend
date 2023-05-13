import './App.css';
import { AdminDashboard } from './Modules/Admin';
import { OfficerDashboard } from './Modules/Officer';
import Login from  './Modules/Admin/Components/Login';
import { useState } from 'react';
import {BrowserRouter} from 'react-router-dom'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication status
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  if (!isAuthenticated) {
    return <Login handleLogin={handleLogin}/>;
  }
  return (
    <BrowserRouter>
      <div className="App">
        <AdminDashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;
