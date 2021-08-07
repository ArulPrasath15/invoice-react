/*
* @created: 06/08/2021 - 9:59 PM
* @author:  Yash
* @description: Component for Client Card used in the /client page
*/
import React from 'react';
import {Button, Card, Col, Row, Space, Typography} from "antd";
import {MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
const { Title, Text } = Typography;

const ClientCard = ({client}) => {
    const {name , email , phone} = client
    return (
        <Card className='shadow-hv shadow br-5'>
            <Row>
                <Col span={6} >
                    <Button  type="danger"  shape="circle" icon={<UserOutlined />} size={"large"} />
                </Col>
                <Col span={18}>
                    <Title level={4}>{name}</Title>
                    <Space direction='vertical'>
                        <Text type='secondary'><MailOutlined /> {email} </Text>
                        <Text type='secondary'><PhoneOutlined /> {phone}</Text>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default ClientCard;
