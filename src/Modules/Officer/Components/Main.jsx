import {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import Incident from './Incident';
import CaseTable from "./CaseTable";
import ReportPage from './ReportPage';

function Main() {
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
      console.error('Error fetching officers:', error);
    });
  
  }
  return (
    <div>
        <Routes>
            <Route path='/' element={<CaseTable data={cases}/>}></Route>
            <Route path='/incidents' element={<Incident/>}></Route>
            <Route path="/reports" element={<ReportPage />}> </Route>
        </Routes>
    </div>
  );
}
export default Main;