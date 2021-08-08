import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ClientCard from "../../components/Client/ClientCard";
import {Layout, Button, Typography, Col, Row, Table, Card, Space, Empty} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return {
        props: {data}, // will be passed to the page component as props
    }
}

function Client({data}) {
    const [clients,setClients] = useState(data);

    return (
        <>
            <Head>
                <title>Client | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
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
            </div>
            <div className='mx-5 mt-5 mb-5'>
                {clients.length == 0 &&
                <Row justify='center' align="middle"  style={{minHeight: '60vh'}}>
                    <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                           imageStyle={{height: 80,}}
                           description={<><Title level={4}>Send Invoices to Clients Seamlessly</Title><Text type="secondary">Add clients to your business.</Text></>}>
                        <Link href='/client/new'>
                            <a>
                                <Button type="primary"    icon={<PlusOutlined />} > Add Client</Button>
                            </a>
                        </Link>
                    </Empty>
                </Row>
                }
                {clients.length > 0 &&
                <Row  justify='space-between'>
                     {clients.map(client=>{
                         return (
                             <Col span={11} key={client.id} className="mt-5">
                                 <ClientCard client={client}  />
                             </Col>
                         )
                     })}
                </Row>
                }
            </div>
        </>
    )
}

export default Client
