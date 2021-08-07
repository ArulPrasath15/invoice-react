import React from 'react';
import ClientForm from "../../components/Client/ClientForm";
import {Button, Col, Row, Typography , Popconfirm} from "antd";
import Head from "next/head";
import {useRouter} from "next/router";

function NewClient(props) {
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
                            okText="Close Any"
                            cancelText="No"
                        >
                            <Button type='danger'>Cancel</Button>
                        </Popconfirm>
                    </Col>
                </Row>
                <div className="form">
                    <Row >
                        <Col span={24} className='bg-white mt-5 mb-5 py-5 px-5 br-5'>
                            <ClientForm />
                        </Col>
                    </Row>
                </div>
            </div>
        </>

);
}

const { Title, Text } = Typography;

export default NewClient;