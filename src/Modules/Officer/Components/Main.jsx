import {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import Incident from './Incident';
import CaseTable from "./CaseTable";
import ReportPage from './ReportPage';

function Main({privileges, loggedOfficer}) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchCases();

  }, [])
  
  useEffect(() => {
    const interval = setInterval(fetchCases, 5000); // Fetch cases every 5 seconds (adjust as needed)

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  const fetchCases = () => {
    fetch('http://localhost:8000/case/')
    .then(response => response.json())
    .then(data => {
      setCases(data);
      console.log(cases);
    })
    .catch(error => {
      console.error('Error fetching Cases:', error);
    });
  
  }
  return (
    <div>
        <Routes>
            <Route path='/' element={<CaseTable data={cases} privileges={privileges}/>}></Route>
            <Route path='/incidents' element={<Incident privileges={privileges} loggedOfficer={loggedOfficer}/>}></Route>
            <Route path="/reports" element={<ReportPage privileges={privileges} loggedOfficer={loggedOfficer}/>}> </Route>
        </Routes>
    </div>
  );
}
export default Main;