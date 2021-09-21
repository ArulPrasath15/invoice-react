/*
* @created: 20/08/2021 - 7:17 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import PositionForm from "../../../../../../components/Timesheet/PositionForm";
import axios from "axios";
import {getSession} from "next-auth/client";
import Head from "next/head";
import {Button, Col, Popconfirm, Row, Typography} from "antd";
import {useRouter} from "next/router";
const {Title}=Typography;

export async function getServerSideProps(props) {
    const {query,req}=props;
    const session=await getSession({req});
    let {pid,tid}=query;
    let res = await axios.get(`${process.env.SERVER_URL}/isValid/project/${pid}`,{ headers: {"Authorization" : `Bearer ${session?.user.token}`} })
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: "/project"}}
    res = await axios.get(`${process.env.SERVER_URL}/isValid/timesheet/${tid}`,{ headers: {"Authorization" : `Bearer ${session?.user.token}`} })
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: `/project/${pid}`}}
    res = await axios.get(`${process.env.SERVER_URL}/timesheet/timesheet_id/${tid}`,{ headers: {"Authorization" : `Bearer ${session?.user.token}`} })
    const timesheet=res.data.timesheet;
    return {
        props: {timesheet}, // will be passed to the page component as props
    }
}

const NewPosition = (props) => {
    const router = useRouter();
    const {timesheet}=props;
    const {pid,tid}=router.query;
    const closeForm = ()=>{
        router.push(`/project/${pid}/timesheet/${tid}`)
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
                        <Popconfirm title="Your changes will not be saved ?" onConfirm={closeForm} okText="Close Any" cancelText="No">
                            <Button type='danger'>Cancel</Button>
                        </Popconfirm>
                    </Col>
                </Row>
                <div className="form">
                    <Row >
                        <Col span={24} className='bg-white mt-5 mb-5 py-5 px-5 br-5'>
                            <PositionForm timesheet={timesheet}/>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};


export default NewPosition;
