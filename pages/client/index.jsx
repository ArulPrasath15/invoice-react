import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ClientCard from "../../components/Client/ClientCard";
import BreadCrumbs from '../../components/Utils/Breadcrumb'
import {Button, Typography, Col, Row, Empty} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import useClients from "../../hooks/useClients";
import {TitleStrip} from "../../components/Utils/TitleStrip";
import EmptyContainer from "../../components/Utils/EmptyContainer";
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
            <TitleStrip head={{title: "My Clients", desc: "Add new clients and store all client related information in client profiles", action:"Add Client", action_link:"/client/new"}}/>
            <div className='mx-5 mt-5 mb-5'>
                {clients.length === 0 &&
                <Row justify='center' align="middle"  style={{minHeight: '60vh'}}>
                    <EmptyContainer/>
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
