/*
* @created: 06/08/2021 - 9:56 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Button, Card, Col, Row, Tabs} from "antd";
import General from "../../components/Settings/General";
import Accounting from "../../components/Settings/Accounting";
import {MyProfile} from "../../components/Settings/MyProfile";
import Head from "next/head";
const { TabPane } = Tabs;
import { Typography } from 'antd';
const { Title,Text } = Typography;

export async function getServerSideProps(context) {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    let countries = await res.json();
    let data=[];
    await countries.forEach(country=>{
        if(country.name && country.callingCodes[0] )
            data.push({
                countryName: country.name,
                countryCallingCodes: country.callingCodes[0],
                countryCode: country.alpha3Code,
            });
    });
    return {
        props: {data}, // will be passed to the page component as props
    }
}


const Settings = ({data}) => {
    return (
        <>
        <Head>
            <title>Settings | Penta Invoice</title>
        </Head>
            <div className="mx-5 mt-5">
                <Row justify='space-between' className='bg-white px-5 py-2 br-5'>
                    <Col span={8}>
                        <Title level={4}>Settings</Title>
                    </Col>
                </Row>
                </div>

        <div className="mx-5 mt-5">
                <Row gutter={24}>
                    <Col span={6}>
                        <Card size="large"  >
                              <MyProfile/>
                        </Card>
                    </Col>
                    <Col span={18} >
                        <div className="card-container">
                        <Tabs type="card" size='large'>
                            <TabPane tab="General" key="1">
                                <General countryData={data}/>
                            </TabPane>
                            <TabPane tab="Accounting" key="2">
                                <Accounting countryData={data}/>
                            </TabPane>
                        </Tabs>
                        </div>
                    </Col>
                </Row>

        </div>
        </>
    );
};

export default Settings;