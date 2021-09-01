import React from 'react';
import {Button, Card, Col, Row, Space, Typography} from "antd";
import {MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
const { Title, Text } = Typography;

function ClientProfile(props) {
    return (
        <>
            <Row>
                <Col span={2}>
                    <Button type="danger"  shape="circle" size={"large"} >
                        P
                    </Button>
                </Col>
                <Col span={10}>
                    <Title level={3} type={'secondary'}>PSG</Title>
                    <Text type={'secondary'}>GST ID: <strong>OWJED092EJ0D9J2</strong></Text>
                </Col>
                <Col>
                    <Space direction={'vertical'}>
                        <Text type={'secondary'}>Email: <Text strong>yashwanth55@gmail.com</Text> </Text>
                        <Text type={'secondary'}>Phone: <Text strong>9909898767</Text></Text>
                        <Text type={'secondary'}>Address: <Text strong>Chennai,Tamilnadu,India</Text></Text>
                    </Space>
                </Col>
            </Row>
        </>
    );
}

export default ClientProfile;