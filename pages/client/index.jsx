import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ClientCard from "../../components/Client/ClientCard";
import BreadCrumbs from '../../components/Utils/Breadcrumb'
import {Layout, Button, Typography, Col, Row, Table, Card, Space, Empty} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;
import axios from 'axios';
import {connect} from 'react-redux'

function Client( {default_business}) {
    const [clients,setClients] = useState([]);
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/client/${default_business._id}`);
                if(res.status == 200){
                    if(res.data.clients)
                        setClients(res.data.clients);
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[])
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
                        <Link href='/client/new'>
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
const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(Client);
