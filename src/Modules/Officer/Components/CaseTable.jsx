import { Table, Input } from 'antd';
import { useState } from 'react';
import CaseDetailModal from './CasePopup';
import CaseFormPopup from './CaseFormPopup'

const offense = [
  {
      id: '23232',
      name: 'yonatan addis',
      age: '12',
      gender: 'Male',
      phone: '112233',
      injuries: 'some injuries',
      medical_information: 'some med info',
      other_notes: 'some notes'
  },
]

const defendant = [
  {
      name: "",
      age: 25,
      gender: 'M',
      address: 'goro street',
      suspect_relationship: 'nothing',
      phone: '+2519223344',
      other_notes: 'some note',
      verdict: 'free',
  },
]

const officer = [
  {
    team_id: '2211',
    team_leader: 'yona',
    technical_inspector: 'yona',
    body_related_inspector: 'yona',
    property_related_inspector: 'yona',
    number_of_patrols: 4
  }
]

const case_info = [
  {
    id: '1234567',
    type: 'children',
    date: '12/12/12',
    descritpion: 'some description',
    status: 'open',
    priority: 'high',
    incident_date: '11-12-11',
    note: 'any note here'
  }
]

const CaseTable = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [caseData, setCaseData] = useState();
  const [victimData, setVictimData] = useState();
  const [suspectData, setSuspectData] = useState();
  const [witnessData, setWitnessData] = useState();
  const [officerData, setOfficerData] = useState();
  
  
  const handleExport = () => {
    console.log('Export data');
  };

  const handleClick = (record) => {
    setCaseData(record.case);
    setVictimData(record.victim);
    setSuspectData(record.suspect);
    setWitnessData(record.witness);
    setOfficerData(record.officers);
    setSelectedRowData(record);
    setVisible(true);

  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedRowData(null);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };


const filteredData = data.filter((item) => {
  const caseData = item.case;

  return (
    (caseData.caseType?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (caseData.casePriority?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (caseData.caseStatus?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );
});



const columns = [
  { title: 'Case ID', dataIndex: ['case', 'case_id'] },
  { title: 'Case Type', dataIndex: ['case', 'caseType'] },
  { title: 'Case Date', dataIndex: ['case', 'caseDate'] },
  { title: 'Case Priority', dataIndex: ['case', 'casePriority'] },
  { title: 'Case Status', dataIndex: ['case', 'caseStatus'] },
  { title: 'Assigned Team ID', dataIndex: ['team', 'team_id'] },
  { title: 'Case Description', dataIndex: ['case', 'caseDescription'] },
];


  return (
    <>
    <div className="mb-4 flex">
    <div className="relative rounded-md shadow-sm w-1/2 justify-center">
      <input
        className="block w-full mt-5 pl-3 pr-10 py-2 text-sm leading-5 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
        type="search"
        placeholder="Search by case type, priority, or status"
        onChange={(e) => handleSearch(e.target.value)}
      />

    </div>
      <CaseFormPopup/>
    </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        style={{width: '100%'}}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              handleClick(record);
            },
          };
        }}
        className='w-2/3'
        pagination={{
          pageSize: 9,
        }}
      />
      <CaseDetailModal
        title="Case Detail"
        visible={visible}
        handleCancel={handleCancel}
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        offense={offense}
        defendant={defendant}
        officer={officer}
        case_info={case_info}
      />
    </>
  );
};

export default CaseTable;