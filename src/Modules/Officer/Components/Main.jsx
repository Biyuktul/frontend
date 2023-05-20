import {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import Incident from './Incident';
import CaseTable from "./CaseTable";
import ReportPage from './ReportPage';

const data = [
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 1,
    type: 'Body Related',
    date: '12/10/2008',
    priority: 'High', 
    status: 'in progress',
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 2, 
    type: 'Body Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },
  { 
    id: 3, 
    type: 'Property Related', 
    date: '12/10/2008', 
    priority: 'High', 
    status: 'in progress', 
    team: '223344',
    description: 'some description about the case'
  },3213123
];

function Main() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/case/')
      .then(response => response.json())
      .then(data => {
        setCases(data);
        console.log(cases);
      })
      .catch(error => {
        console.error('Error fetching officers:', error);
      });
  
  }, [])
  
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