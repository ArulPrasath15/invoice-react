import React from 'react'

import {Layout, Button, Typography, Col, Row, Table , Card, Space} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

function Timesheet() {
    return (
        <div className='mt-5 mx-5'>
           <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                <Col span={8}>
                    <Title level={3}  >Timesheet</Title>
                </Col>
                <Col span={4} offset={11}>
                <Button type="primary"   icon={<PlusOutlined />} >Add Timesheet</Button>
                </Col>
           </Row>
        </div>
    )
}

export default Timesheet
