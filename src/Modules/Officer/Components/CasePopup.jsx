import { Modal, Table, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CaseDetailModal = ({ visible, handleCancel, case_info, offense, defendant, officer, selectedRowData }) => {

  const handleExport = () => {
    //do some operation
  }
  return (
    <Modal
      title="Case Detail"
      visible={visible}
      onCancel={handleCancel}
      style={{ maxWidth: '100%', minWidth: '70%' }}
      footer={[
        <div className='flex justify-end'> 
          <Upload
              beforeUpload={() => false}>
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
                    { key: 'type', label: 'Case Type', value: c.type },
                    { key: 'date', label: 'Case Date', value: c.date },
                    { key: 'description', label: 'Case Description', value: c.descritpion },
                    { key: 'status', label: 'Case Status', value: c.status },
                    { key: 'priority', label: 'Case Priority', value: c.priority },
                    { key: 'incident_date', label: 'Incident Date', value: c.incident_date },
                    { key: 'note', label: 'Case Note', value: c.note },
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
                            <strong>{detail.label}: </strong>
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
              <Table
                style={{ width: 300 }}
                dataSource={offense.map((o) => ({
                  key: o.id,
                  title: '',
                  details: [
                    { key: 'name', label: 'Full Name', value: o.name },
                    { key: 'age', label: 'Age', value: o.age },
                    { key: 'gender', label: 'Gender', value: o.gender },
                    { key: 'phone', label: 'Phone', value: o.phone },
                    { key: 'medical_information', label: 'Medical Info', value: o.medical_information },
                    { key: 'injuries', label: 'Injuries', value: o.injuries },
                    { key: 'notes', label: 'Notes', value: o.other_notes },

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
                            <strong>{detail.label}: </strong>
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

            <div style={{ gridArea: 'defendant-info' }}>
              <h1 style={{ width: 300, display: 'inline-block' }} className='font-bold text-2xl text-red-500'>Suspect information </h1>
              <Table
                style={{ width: 300 }}
                dataSource={defendant.map((d) => ({
                  key: d.id,
                  details: [
                    { key: 'name', label: 'Suspect Name', value: d.name },
                    { key: 'age', label: 'Suspect Age', value: d.age },
                    { key: 'gender', label: 'Suspect Gender', value: d.gender },
                    { key: 'address', label: 'Suspect Address', value: d.address },
                    
                    { key: 'phone', label: 'Suspect Phone', value: d.phone },
                    { key: 'suspect_relationship', label: 'Suspect Relationship', value: d.suspect_relationship },
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
                            <strong>{detail.label}: </strong>
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

            <div style={{ gridArea: 'case-handler' }}>
              <h1 style={{ width: 300, display: 'inline-block' }} className='font-bold text-2xl text-red-500'>Case Handling Officers information </h1>
              <Table
                style={{ width: 300 }}
                dataSource={officer.map((o) => ({
                  key: o.id,
                  details: [
                    { key: 'leader', label: 'Team Leader', value: o.team_leader },
                    { key: 't-inspector', label: 'Technichal Inspector', value: o.technical_inspector },
                    { key: 'b-inspector', label: 'Body Related Inspector', value: o.body_related_inspector },
                    { key: 'p-inspector', label: 'Property Related Inspector', value: o.property_related_inspector },
                    { key: 'patrols', label: 'Number Of Patrols', value: o.number_of_patrols },
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
                            <strong>{detail.label}: </strong>
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
            
            <div style={{gridArea: 'evidences', border: '1px solid red', width: '100%', textAlign: 'center'}}>
              <h1 style={{ width: 300, display: 'inline-block' }} className='font-bold text-2xl text-red-500'>Evidences </h1>
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