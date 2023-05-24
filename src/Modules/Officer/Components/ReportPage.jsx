import SquareCard from './SquareCard';
import { GiPoliceOfficerHead, GiHandcuffs } from 'react-icons/gi';
import { MdLocalPolice } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa';
import '../styles/style.css';
import EditableTable from './ReportTable';
import { useState, useEffect } from 'react';
import NewReport from './NewReport';

const card1_info = "open cases"
const card2_info = "closed cases"
const card3_info = "complaints"
const card4_info = "warnings"
const card5_info = "arrests"
const card6_info = "incidents reported"
const chartData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 150 },
    { name: 'Apr', value: 130 },
    { name: 'May', value: 180 },
    { name: 'Jun', value: 200 },
  ];

  const sample = [
    {
        key: "1",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "2",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'Training Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "3",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'Safety Announcements',
        reportBody: 'the report body here'
      },
      {
        key: "4",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "5",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "6",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "7",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "8",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "9",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
      {
        key: "10",
        name: "Yon Brown",
        date: '22/22/22',
        type: 'General Announcement',
        reportBody: 'the report body here'
      },
  ]

function OverviewDashboard({privileges, loggedOfficer}) {
    const [data, setData] = useState(sample);

    useEffect(() => {
      fetch('http://127.0.0.1:8000/reports/')
        .then(response => response.json())
        .then(result => setData(result))
        .catch(error => console.error('Error:', error));
    }, []);

    const [openCaseChartData, setOpenCaseChartData] = useState([
      { name: 'Jan', value: 0 },
      { name: 'Feb', value: 0 },
      { name: 'Mar', value: 0 },
      { name: 'Apr', value: 0 },
      { name: 'May', value: 0 },
      { name: 'Jun', value: 0 },
      { name: 'Jul', value: 0 },
      { name: 'Aug', value: 0 },
      { name: 'Sep', value: 0 },
      { name: 'Oct', value: 0 },
      { name: 'Nov', value: 0 },
      { name: 'Dec', value: 0 },
    ]);
    const [closedCaseChartData, setClosedCaseChartData] = useState([
      { name: 'Jan', value: 0 },
      { name: 'Feb', value: 0 },
      { name: 'Mar', value: 0 },
      { name: 'Apr', value: 0 },
      { name: 'May', value: 0 },
      { name: 'Jun', value: 0 },
      { name: 'Jul', value: 0 },
      { name: 'Aug', value: 0 },
      { name: 'Sep', value: 0 },
      { name: 'Oct', value: 0 },
      { name: 'Nov', value: 0 },
      { name: 'Dec', value: 0 },
    ]);
    
    const [complaintChartData, setComplaintChartData] = useState([
      { name: 'Jan', value: 0 },
      { name: 'Feb', value: 0 },
      { name: 'Mar', value: 0 },
      { name: 'Apr', value: 0 },
      { name: 'May', value: 0 },
      { name: 'Jun', value: 0 },
      { name: 'Jul', value: 0 },
      { name: 'Aug', value: 0 },
      { name: 'Sep', value: 0 },
      { name: 'Oct', value: 0 },
      { name: 'Nov', value: 0 },
      { name: 'Dec', value: 0 },
    ]);

    const fetchOpenCaseCountByMonth = () => {
      fetch('http://127.0.0.1:8000/case/open-case-per-month/')
            .then(response => response.json())
            .then(data => {
                const updatedChartData = openCaseChartData.map(item => {
                    const matchingData = data.find(obj => obj.name === item.name);
                    if (matchingData) {
                      return { name: matchingData.name, value: matchingData.value };
                    } else {
                      return item;
                    }
                  });
                  setOpenCaseChartData(updatedChartData);
            })
            .catch(error => {
            console.error(error);
        });
      };

    const fetchClosedCaseCountByMonth = () => {
      fetch('http://127.0.0.1:8000/case/closed-case-per-month/')
            .then(response => response.json())
            .then(data => {
                const updatedChartData = closedCaseChartData.map(item => {
                    const matchingData = data.find(obj => obj.name === item.name);
                    if (matchingData) {
                      return { name: matchingData.name, value: matchingData.value };
                    } else {
                      return item;
                    }
                  });
                  setClosedCaseChartData(updatedChartData);
            })
            .catch(error => {
            console.error(error);
        });
      };
    
    const fetchComplaintCountByMonth = () => {
      fetch('http://127.0.0.1:8000/complaint/complaint-per-month/')
            .then(response => response.json())
            .then(data => {
                const updatedChartData = closedCaseChartData.map(item => {
                    const matchingData = data.find(obj => obj.name === item.name);
                    if (matchingData) {
                      return { name: matchingData.name, value: matchingData.value };
                    } else {
                      return item;
                    }
                  });
                  setComplaintChartData(updatedChartData);
            })
            .catch(error => {
            console.error(error);
        });
      };



  useEffect(() => {
    fetchOpenCaseCountByMonth();
    fetchClosedCaseCountByMonth();
    fetchComplaintCountByMonth();
  }, []);

  const totalOpenCases = openCaseChartData.reduce((acc, cur) => acc + cur.value, 0);
  const totalClosedCases = closedCaseChartData.reduce((acc, cur) => acc + cur.value, 0);
  const totalComplaint = complaintChartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="overview-container">
        <div className='card-container'>
            <SquareCard title={card1_info} number={totalOpenCases} chartData={openCaseChartData} className="flex justify-center">
                <MdLocalPolice size={30} style={{ fill: '#0E8388' }}/>
            </SquareCard>
            <SquareCard title={card2_info} number={totalClosedCases} chartData={closedCaseChartData} >
                <GiPoliceOfficerHead size={30} style={{ fill: '#4D455D' }}/>
            </SquareCard>
            <SquareCard title={card3_info} number={totalComplaint} chartData={complaintChartData} >
                <FaFlag size={30} style={{ fill: '#698269' }}/>
            </SquareCard>
            <SquareCard title={card6_info} number={40} chartData={chartData} >
                <GiPoliceOfficerHead size={30} style={{ fill: '#4D455D' }}/>
            </SquareCard>
            
        </div>
        <div className='w-full report-container2'>
            <NewReport loggedOfficer={loggedOfficer}/>
            <EditableTable
              privileges={privileges}
              data={data}
              setData={setData}
            />          
        </div>
    </div>
  );
}
export default OverviewDashboard;