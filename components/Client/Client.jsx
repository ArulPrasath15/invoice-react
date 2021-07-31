import React from 'react'
import '../../styles/client.css'
import {Layout, Button, Typography, Col, Row, Table , Card, Space} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

function Client() {
    return (
        <div className='mt-5 mx-5'>
           <Row justify='space-between' className='bg-white px-5 py-2'>
                <Col span={8}>
                    <Title level={3} >Client</Title>
                </Col>
                <Col span={3} offset={12}>
                <Button type="primary" style={{borderRadius:'6px'}} icon={<PlusOutlined />} > Add Client</Button>
                </Col>
           </Row>
           <Row className="mt-5" justify='space-around'>
                <Col span={8}>
                    <Card>
                        <Row>
                            <Col span={6}>
                                <Button  type="danger"  shape="circle" icon={<UserOutlined />} size={"large"} />
                            </Col>
                            <Col span={18}>
                                <Title level={4}>Adam Wilson</Title>
                                <Space direction='vertical'>
                                    <div>
                                        <Text type='secondary' copyable>adamwilson@gmail.com</Text>
                                    </div>
                                    <div>
                                        <Text type='secondary' copyable>99978765456</Text>
                                    </div>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card>
                        <Row>
                            <Col span={6}>
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
