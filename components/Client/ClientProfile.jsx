import React from 'react';
import {Button, Card, Col, Row, Space, Typography} from "antd";
import {MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
const { Title, Text } = Typography;

function ClientProfile(props) {
    const {client} = props;
    return (
        <>
            <Row>
                <Col span={2}>
                    <Button type="danger"  shape="circle" size={"large"} >
                        P
                    </Button>
                </Col>
                {client &&
                    <>
                        <Col span={10}>
                            <Title level={3} type={'secondary'}>{client.business_name}</Title>
                            <Text type={'secondary'}>GST ID: <strong>{client.gstin}</strong></Text>
                        </Col>
                        <Col>
                            <Space direction={'vertical'}>
                                <Text type={'secondary'}>Email: <Text strong>{client.email}</Text> </Text>
                                <Text type={'secondary'}>Phone: <Text strong>{client.phone}</Text></Text>
                                <Text type={'secondary'}>Address: <Text strong>{client.state}, {client.country}</Text></Text>
                            </Space>
                        </Col>
                    </>
                }
            </Row>
        </>
    );
}

export default ClientProfile;