/*
* @created: 07/08/2021 - 1:22 PM
* @author: Yash
* @description: List the available clients for a particular busniess
*/
import React from 'react';
import ClientForm from "../../components/Client/ClientForm";
import {Button, Col, Row, Typography , Popconfirm} from "antd";
import Head from "next/head";
import {useRouter} from "next/router";

export async function getServerSideProps() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    let countries = await res.json();
    let data=[];
    await countries.forEach(country=>{
        if(country.alpha3Code!=null && country.callingCodes[0] !=null && country.name != null)
            data.push({
                code: country.alpha3Code,
                callingCode: country.callingCodes[0],
                name:country.name
            });
    });
    return {
        props: {data}, // will be passed to the page component as props
    }
}

function NewClient(props) {
    const {data} = props
    const router = useRouter();
    const closeForm = ()=>{
        router.push('/client')
    }
    return (
        <>
            <Head>
                <title>New Client | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5'>
                <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col span={8}>
                        <Title level={4}  >Add New Client</Title>
                    </Col>
                    <Col span={3} offset={12}>
                        <Popconfirm
                            title="Your changes will not be saved ?"
                            onConfirm={closeForm}
                            okText="Close anyway"
                            cancelText="No"
                        >
                            <Button type='danger'>Cancel</Button>
                        </Popconfirm>
                    </Col>
                </Row>
                <div className="form">
                    <Row className='bg-white mt-5 mb-5 py-5 px-5 br-5' >
                        <Col xs={{span: 24}} lg={{span: 12, offset:6}}  >
                            <ClientForm data={data} />
                        </Col>
                    </Row>
                </div>
            </div>
        </>

);
}

const { Title, Text } = Typography;

export default NewClient;