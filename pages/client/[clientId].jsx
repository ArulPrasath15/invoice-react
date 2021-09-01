import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import axios from 'axios';
import {connect} from 'react-redux'
import Head from 'next/head';
import Link from 'next/link'
import  styles from '../../assets/css/Client.module.css';
import {Layout, Button, Typography, Col, Row, Table , Card, Space,Tabs, Dropdown} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined,EditOutlined} from '@ant-design/icons';
import Breadcrumbs from '../../components/Utils/Breadcrumb'
import ClientProfile from '../../components/Client/ClientProfile'
import ClientRecipient from '../../components/Client/ClientRecipient';
import ClientFiles from '../../components/Client/ClientFiles'
const { Title, Text } = Typography;
const { TabPane } = Tabs;

function ClientView(props) {
    const {default_business} = props;
    const Router = useRouter();
    const [client,setClient] = useState(null);
    useEffect(()=>{
        const {clientId} = Router.query;
        (async ()=>{
            try{
                const res = await axios.get(`/client/${default_business._id}/${clientId}`);
                if(res.data.client)
                    setClient(res.data.client);
                else
                    throw Error(res.data.msg);
            }catch (e){
                console.log(e);
            }
        })();
    },[]);
    return(
       <>
           <Head>
               <title>PentaFox | Client</title>
               <meta name="viewport" content="initial-scale=1.0, width=device-width" />
           </Head>
           <div className='mt-5 mx-5'>
               <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                   <Col span={13}>
                       <Title level={4} >Client Profile</Title>
                       <Text className={'mt-3'} type={'secondary'}>View and update client related activities here</Text>
                   </Col>
                   <Col span={3} offset={6}>
                       <Link href='/client/new'>
                           <a>
                               <Button type={'primary'} icon={<EditOutlined/>}> Edit</Button>
                           </a>
                       </Link>
                   </Col>
                   <Col span={24} className='bg-white py-2 br-5'>
                       <Breadcrumbs/>
                   </Col>
               </Row>
           </div>
           <div className="mx-5 mt-5">
               <Row gutter={24}>
                   <Col span={24}>
                       <Card size="large"  >
                           <ClientProfile client={client} />
                       </Card>
                   </Col>
                   <Col span={24} className={'mt-5'}>
                       <div className="card-container">
                           <Tabs type="card" size='large'>
                               <TabPane tab="General" key="1">
                                   <ClientRecipient/>
                               </TabPane>
                               <TabPane tab="Files" key="2">
                                   <ClientFiles/>
                               </TabPane>
                           </Tabs>
                       </div>
                   </Col>
               </Row>

           </div>
       </>
    );
}

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(ClientView);