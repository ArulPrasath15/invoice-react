import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import ClientCard from "../../components/Client/ClientCard";
import {Layout, Button, Typography, Col, Row, Table , Card, Space} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

function Client() {
    const [clients,setClients] = useState([]);
    useEffect( async ()=>{
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setClients(data)
    },[])
    return (
        <div className='mt-5 mx-5'>
           <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                <Col span={8}>
                    <Title level={4}  >Client</Title>
                </Col>
                <Col span={3} offset={12}>
                    <Link href='/client/new'>
                        <a>
                            <Button type="primary"    icon={<PlusOutlined />} > Add Client</Button>
                        </a>
                    </Link>
                </Col>
           </Row>
           <Row className="mt-5 mb-5" justify='space-between'>
                {clients.map(client=>{
                    return (
                        <Col span={11} key={client.id} className="mt-5">
                            <ClientCard client={client}  />
                        </Col>
                    )
                })}
           </Row>
        </div>
    )
}

export default Client
