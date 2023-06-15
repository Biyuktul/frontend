import { Modal, Table, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const CaseDetailModal = ({ visible, handleCancel, case_info, offense, defendant, officer, selectedRowData, setCaseInfo }) => {

  const handleCloseCase = () => {
    fetch(`http://127.0.0.1:8000/case/update/${case_info[0].case_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "caseType": "Burglary",
          "casePriority": "Medium",
          "caseStatus": "Closed",
          "caseDescription": "A burglary case involving a break-in at a residential property.",
          "caseDate": "2023-05-15",
          "caseNote": "Evidence collected at the scene. Investigation in progress."
        }
      ),
      })
      .then((response) => response.json())
      .then((data) => {
        setCaseInfo(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
    }
  

  const handleExport = () => {
    console.log(case_info)
  }

  const dataSource = [
    {
      key: '1',
      details: [
        { key: 'leader', label: 'Team Leader', value: officer && officer[0] ? officer[0].full_name : '' },
        { key: 't-inspector', label: 'Technical Inspector', value: officer && officer[1] ? officer[1].full_name : '' },
        { key: 'b-inspector', label: 'Body Related Inspector', value: officer && officer[2] ? officer[2].full_name : '' },
        { key: 'p-inspector', label: 'Property Related Inspector', value: officer && officer[3] ? officer[3].full_name : '' },
        { key: 'patrols', label: 'Number Of Patrols', value: 10 },
      ],
    },
  ];

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('evidence_data', file);
    formData.append('case_id', case_info[0].case_id)
    try {
      const response = await fetch('http://127.0.0.1:8000/evidence/create/', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Modal
      title="Case Detail"
      visible={visible}
      onCancel={handleCancel}
      style={{ maxWidth: '100%', minWidth: '70%' }}
      footer={[
        <div className='flex justify-end'> 
        <Button key="export" danger onClick={handleCloseCase} style={{ marginRight: '20px' }}>
          Close Case
        </Button>
        <Upload
          beforeUpload={(file) => handleUpload(file)}
          showUploadList={false}
        >
        <Button icon={<UploadOutlined />}>Upload Evidences File Here</Button>
      </Upload>
        <Button key="export" type="primary" onClick={handleExport} style={{ backgroundColor: '#1677ff', marginLeft: '20px' }}>
          Export
        </Button>,
        </div>
      ]}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateAreas: `
                                'case-info defendant-info evidences'
                                'offense-info case-handler evidences'
                                
                        `,
          justifyContent: 'space-around'
        }}
      >

        {selectedRowData && (
          <>
            <div style={{ gridArea: 'case-info' }}>
              <h1 style={{ width: 300, display: 'inline-block' }} className='font-bold text-2xl text-red-500'>Case information </h1>
              <Table
                style={{ width: 300 }}
                dataSource={case_info.map((c) => ({
                  key: c.id,
                  title: '',
                  details: [
                    { key: 'type', label: 'Case Type', value: c.caseType },
                    { key: 'date', label: 'Case Date', value: c.caseDate },
                    { key: 'description', label: 'Case Description', value: c.caseDescritpion },
                    { key: 'status', label: 'Case Status', value: c.caseStatus },
                    { key: 'priority', label: 'Case Priority', value: c.casePriority },
                    { key: 'note', label: 'Case Note', value: c.caseNote },
                  ],
                }))}
                columns={[
                  {
                    dataIndex: 'title',
                    render: (text, record) => (
                      <>
                        <div>{text}</div>
                        {record.details.map((detail) => (
                          <div key={detail.key}>
                            <strong style={{ fontWeight: 'bold' }}>{detail.label}::: </strong>
                            {detail.value}
                          </div>
                        ))}
                      </>
                    ),
                  },
                ]}
                pagination={false}
                size="small"
              />
            </div>

            <div style={{ gridArea: 'offense-info' }}>
              <h1 style={{ width: 300, display: 'inline-block' }} className='font-bold text-2xl text-red-500'>Victim Information</h1>
              {offense[0] != null &&
              <Table
                style={{ width: 300 }}
                dataSource={offense.map((o) => ({
                  title: '',
                  details: [
                    { key: 'name', label: 'Full Name', value: o.victim_name },
                    { key: 'age', label: 'Age', value: o.victim_age },
                    { key: 'gender', label: 'Gender', value: o.victim_gender },
                    { key: 'phone', label: 'Phone', value: o.victim_phone },
                    { key: 'medical_information', label: 'Medical Info', value: o.victim_medicalInfo },
                    { key: 'injuries', label: 'Injuries', value: o.victim_injuries },
                    { key: 'address', label: 'Address', value: o.victim_address },

                  ],
                }))}
                columns={[
                  {
                    dataIndex: 'title',
                    render: (text, record) => (
                      <>
                        <div>{text}</div>
                        {record.details.map((detail) => (
                          <div key={detail.key}>
                            <strong style={{ fontWeight: 'bold' }}>{detail.label}::: </strong>
                            {detail.value}
                          </div>
                        ))}
                      </>
                    ),
                  },
                ]}
                pagination={false}
                size="small"
              />
            }
            </div>

            <div style={{ gridArea: 'defendant-info' }}>
          
              <h1 style={{ width: 300, display: 'inline-block' }} className='font-bold text-2xl text-red-500'>Suspect information </h1>
            {defendant[0] != null &&
              <Table
                style={{ width: 300 }}
                dataSource={defendant.map((d) => ({
                  key: d.id,
                  details: [
                    { key: 'name', label: 'Suspect Name', value: d.suspectFullName },
                    { key: 'age', label: 'Suspect Age', value: d.suspectAge },
                    { key: 'gender', label: 'Suspect Gender', value: d.suspectGender },
                    { key: 'address', label: 'Suspect Address', value: d.suspectAddress },
                    
                    { key: 'phone', label: 'Suspect Phone', value: d.suspectPhone },
                    { key: 'suspect_relationship', label: 'Suspect Relationship', value: d.suspectRelationship },
                    { key: 'suspect_notes', label: 'Suspect Notes', value: d.suspectNotes },
                    { key: 'verdict', label: 'Suspect Verdict', value: d.verdict },
                  ],
                }))}
                columns={[
                  {
                    dataIndex: 'title',
                    render: (text, record) => (
                      <>
                        <div>{text}</div>
                        {record.details.map((detail) => (
                          <div key={detail.key}>
                            <strong style={{ fontWeight: 'bold' }}>{detail.label}::: </strong>
                            {detail.value}
                          </div>
                        ))}
                      </>
                    ),
                  },
                ]}
                pagination={false}
                size="small"
              />
        }
            </div>

            <div style={{ gridArea: 'case-handler' }}>
              <h1 style={{ width: 300, display: 'inline-block' }} className='font-bold text-2xl text-red-500'>Case Handling Officers information </h1>
              {officer[0] !== 'undefined'&&
              <Table
                style={{ width: 300 }}
                dataSource={dataSource}
                columns={[
                  {
                    dataIndex: 'title',
                    render: (text, record) => (
                      <>
                        <div>{text}</div>
                        {record.details.map((detail) => (
                          <div key={detail.key}>
                            <strong style={{ fontWeight: 'bold' }}>{detail.label}::: </strong>
                            {detail.value}
                          </div>
                        ))}
                      </>
                    ),
                  },
                ]}
                pagination={false}
                size="small"
              />
              }
            </div>
            
            <div style={{ gridArea: 'evidences', border: '1px solid red', width: '100%', textAlign: 'center', height: '300px', overflow: 'auto' }}>
              <h1 style={{ width: 300, display: 'inline-block'}} className='font-bold text-2xl text-red-500'>Evidences</h1>
              <div>
              
              </div>
            </div>


          </>
        )}
      </div>
    </Modal>
  )
}

export default CaseDetailModal;