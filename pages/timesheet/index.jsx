import React from 'react'
import notify from '../../components/Utils/notify';
import { Empty } from 'antd';

import {Layout, Button, Typography, Col, Row, Table , Card, Space} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

function Timesheet() {
    return (
        <>
        <div className='mt-5 mx-5'>
           <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                <Col span={8}>
                    <Title level={4}  >Timesheet</Title>
                </Col>
                <Col span={4} offset={11}>
                <Button type="primary" icon={<PlusOutlined />} onClick={()=>notify({type:'success',msg:'Not yet Available'})}>Add Timesheet</Button>
                </Col>
           </Row>
        </div>
        <div className='mt-5 mx-5'>
           <Row justify='center' align="middle"  className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
               <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{height: 80,}}
                      description={<><Title level={4}>Track your work time</Title><Text type="secondary">Create timesheets for different clients and turn them into invoices.</Text></>}>
                   <Button type="primary" icon={<PlusOutlined />}>Add Timesheet</Button>
               </Empty>
           </Row>
        </div>
        </>
    )
}

export default Timesheet
