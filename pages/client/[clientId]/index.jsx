/*
* @created: 02/09/2021 - 1:55 PM
* @author: Yash
* @description: client profile component
*/
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import axios from 'axios';
import {connect} from 'react-redux'
import Head from 'next/head';
import Link from 'next/link'
import { Button, Typography, Col, Row , Card,Tabs} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import Breadcrumbs from '../../../components/Utils/Breadcrumb'
import ClientProfile from '../../../components/Client/ClientProfile'
import ClientRecipient from '../../../components/Client/ClientRecipient'
import ClientFiles from '../../../components/Client/ClientFiles'
import ClientEdit from "../../../components/Client/ClientEdit";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

export async function getServerSideProps() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    let countries = await res.json();
    let countryData=[];
    await countries.forEach(country=>{
        if(country.alpha3Code!=null && country.callingCodes[0] !=null && country.name != null)
            countryData.push({
                code: country.alpha3Code,
                callingCode: country.callingCodes[0],
                name:country.name
            });
    });
    return {
        props: {countryData}, // will be passed to the page component as props
    }
}

function ClientView(props) {
    const {default_business,countryData} = props;
    const Router = useRouter();
    const [client,setClient] = useState(null);
    const [edit,setEdit] = useState(false);
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
    },[Router.query,default_business]);
    return(
        <>
            <Head>
                <title>PentaFox | Client</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5 mb-5'>
                <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col span={13}>
                        <Title level={4} >Client Profile</Title>
                        <Text className={'mt-3'} type={'secondary'}>View and update client related activities here</Text>
                    </Col>
                    <Col span={3} offset={6}>
                        {!edit &&
                        <Button type={'primary'} icon={<EditOutlined/>} onClick={()=>{setEdit(true)}}> Edit</Button>
                        }
                    </Col>
                    <Col span={24} className='bg-white py-2 br-5'>
                        <Breadcrumbs/>
                    </Col>
                </Row>
            </div>

            {!edit &&
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
            }
            {edit &&
                <Card className={'mt-5 mx-5 mb-5'}>
                    <ClientEdit client={client} countryData={countryData} setEdit={setEdit} setClient={setClient} />
                </Card>
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(ClientView);