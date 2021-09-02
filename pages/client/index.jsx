import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ClientCard from "../../components/Client/ClientCard";
import BreadCrumbs from '../../components/Utils/Breadcrumb'
import {Button, Typography, Col, Row, Empty} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import useClients from "../../hooks/useClients";
const { Title, Text } = Typography;


function Client() {
    // const [clients,setClients] = useState([]);
    const {data: clients} = useClients();

    return (
        <>
            <Head>
                <title>Client | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5'>
               <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col span={13}>
                        <Title level={4} >My Clients</Title>
                        <Text className={'mt-3'} type={'secondary'}>Add new clients and store all client related information in client profiles</Text>
                    </Col>
                    <Col span={3} offset={6}>
                        <Link href="/client/new">
                            <a>
                                <Button type="primary"    icon={<PlusOutlined />} > Add Client</Button>
                            </a>
                        </Link>
                    </Col>
                   <Col span={24} className={'mt-3'}>
                       <BreadCrumbs />
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
                                <Button type="primary" icon={<PlusOutlined />} > Add Client</Button>
                            </a>
                        </Link>
                    </Empty>
                </Row>
                }
                {clients.length > 0 &&
                <Row  justify='space-between'>
                     {clients.map(client=>{
                         return (
                             <Col span={11} key={client._id} className="mt-5">
                                 <Link href={`/client/${client._id}`}>
                                     <a>
                                         <ClientCard client={client}/>
                                     </a>
                                 </Link>
                             </Col>
                         )
                     })}
                </Row>
                }
            </div>
        </>
    )
}


export default Client;
