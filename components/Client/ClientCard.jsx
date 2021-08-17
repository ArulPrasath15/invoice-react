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
    const {business_name , email , phone} = client
    return (
        <Card className='shadow-hv shadow br-5'>
            <Row align='middle'>
                <Col span={12}>
                    <Button type="danger"  shape="circle" size={"large"} >
                        {business_name[0]}
                    </Button>
                    <Title className='mt-2' type='secondary' level={5}>{business_name}</Title>
                </Col>
                <Col span={12}>
                    <Space direction='vertical' className='mt-2'>
                        <Text type='secondary'><MailOutlined /> {email} </Text>
                        <Text type='secondary'><PhoneOutlined /> {phone}</Text>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default ClientCard;
