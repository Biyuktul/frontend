
import { useState, useEffect } from 'react';
import ActivityLog from './ActivityLog';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { MdLocalPolice } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa';
import '../styles/Main.css';
import SquareCard from './SquareCard';

const card1_info = "Officers Created"
const card2_info = "Failed Activities"
const card3_info = "Access Requests"
const card6_info = "incidents reported"


function OverviewDashboard() {
    const [officerChartData, setOfficerChartData] = useState([
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
    ]);

    const [logChartData, setLogChartData] = useState([
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
    ]);

    const [requestChartData, setRequestChartData] = useState([
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
    ]);
    
    const [reportChartData, setReportChartData] = useState([
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
    ]);



      const fetchOfficerCountByMonth = () => {
        fetch('http://127.0.0.1:8000/officers/officers-per-month/')
            .then(response => response.json())
            .then(data => {
                const updatedChartData = officerChartData.map(item => {
                    const matchingData = data.find(obj => obj.name === item.name);
                    if (matchingData) {
                      return { name: matchingData.name, value: matchingData.value };
                    } else {
                      return item;
                    }
                  });
                  setOfficerChartData(updatedChartData);
            })
            .catch(error => {
            console.error(error);
        });
      };
    
      useEffect(() => {
        fetchOfficerCountByMonth();
      }, []);

      const totalOfficers = officerChartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="admin-overview-container">
        <div className='admin-card-container'>
            <SquareCard title={card1_info} number={totalOfficers} chartData={officerChartData} className="flex justify-center">
                <MdLocalPolice size={30} style={{ fill: '#0E8388' }}/>
            </SquareCard>
            <SquareCard title={card2_info} number={40} chartData={logChartData} >
                <GiPoliceOfficerHead size={30} style={{ fill: '#4D455D' }}/>
            </SquareCard>
            <SquareCard title={card3_info} number={40} chartData={requestChartData} >
                <FaFlag size={30} style={{ fill: '#698269' }}/>
            </SquareCard>
            <SquareCard title={card6_info} number={40} chartData={reportChartData} >
                <GiPoliceOfficerHead size={30} style={{ fill: '#4D455D' }}/>
            </SquareCard>
            
        </div>

        {/* <div className='admin-chart-container2'>
            <Chart />
        </div> */}
        <div className= 'log-table mt-0 ml-5 mr-10'>
            <ActivityLog />
        </div>
    </div>
  );
}
export default OverviewDashboard;