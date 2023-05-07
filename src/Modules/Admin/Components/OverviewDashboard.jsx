
import Chart from './Chart';
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
const chartData = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 50 },
    { name: 'Apr', value: 30 },
    { name: 'May', value: 80 },
    { name: 'Jun', value: 20 },
  ];


function OverviewDashboard() {
  return (
    <div className="admin-overview-container">
        <div className='admin-card-container'>
            <SquareCard title={card1_info} number={40} chartData={chartData} className="flex justify-center">
                <MdLocalPolice size={30} style={{ fill: '#0E8388' }}/>
            </SquareCard>
            <SquareCard title={card2_info} number={40} chartData={chartData} >
                <GiPoliceOfficerHead size={30} style={{ fill: '#4D455D' }}/>
            </SquareCard>
            <SquareCard title={card3_info} number={40} chartData={chartData} >
                <FaFlag size={30} style={{ fill: '#698269' }}/>
            </SquareCard>
            <SquareCard title={card6_info} number={40} chartData={chartData} >
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