import StaffTable from './StaffTable';
import { useState, useEffect } from 'react';

import '../styles/App.css';

function StaffsDashboard({setNotifications, notifications}) {
  const [officers, setOfficers] = useState([]);
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/officers/')
      .then(res => res.json())
      .then(data => setOfficers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className=''>
          <div className=''>
          <StaffTable
            employees={officers}
            setOfficers={setOfficers}
            setNotifications={setNotifications}
            notifications={notifications}  
          />
          </div>
    </div>
  );
  }
  export default StaffsDashboard;