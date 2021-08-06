import React from 'react'
// import  styles from '../assets/css/Client.module.css'
import {Layout, Button, Typography, Col, Row, Table , Card, Space} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

function Client() {
    return (
        <div className='mt-5 mx-5'>
           <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                <Col span={8}>
                    <Title level={3}  >Client</Title>
                </Col>
                <Col span={3} offset={12}>
                <Button type="primary"    icon={<PlusOutlined />} > Add Client</Button>
                </Col>
           </Row>
           <Row className="mt-5 " justify='space-between'>
                <Col span={8}>
                    <Card className='shadow-hv shadow br-5'>
                        <Row>
                            <Col span={6} >
                                <Button  type="danger"  shape="circle" icon={<UserOutlined />} size={"large"} />
                            </Col>
                            <Col span={18}>
                                <Title level={4}>Adam Wilson</Title>
                                <Space direction='vertical'>
                                    <Text type='secondary'><MailOutlined /> adamwilson@gmail.com</Text>
                                    <Text type='secondary'><PhoneOutlined /> 99978765456</Text>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
           </Row>
        </div>
    )
}

export default Client
