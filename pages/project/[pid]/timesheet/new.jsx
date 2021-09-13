/*
* @created: 07/08/2021 - 1:22 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import TimesheetForm from "../../../../components/Timesheet/TimesheetForm";
import Head from "next/head";
import {Button, Col, Popconfirm, Row, Typography} from "antd";
import {useRouter} from "next/router";
import axios from "axios";
import getCurrency from "../../../../hooks/getCurrency";
const { Title, Text } = Typography;

export async function getServerSideProps({query}) {
    let data=await getCurrency();
    let {pid}=query;
    const res = await axios.get(`${process.env.SERVER_URL}/isValid/project/${pid}`)
    if(!res.data.isValid)
    {
        return {redirect: {permanent: false, destination: "/404"}}
    }
    return {
        props: {data}, // will be passed to the page component as props
    }
}

const NewTimeSheet = ({data}) => {
    const router = useRouter();
    const closeForm = ()=>{
        router.push('/timesheet')
    }
    return (
        <>
            <Head>
                <title>New Timesheet | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5'>
                <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col span={8}>
                        <Title level={4}  >Create New Timesheet</Title>
                    </Col>
                    <Col span={2} offset={12}>
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
                            <TimesheetForm data={data}/>
                        </Col>
                    </Row>
                </div>
            </div>
        </>

    );
};

export default NewTimeSheet;
