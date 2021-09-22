/*
* @created: 23/08/2021 - 10:50 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import PositionList from "../../../../../components/Timesheet/PositionList";
import Head from "next/head";
import {Col, Row} from "antd";
import TimesheetInfo from "../../../../../components/Timesheet/TimesheetInfo";
import {useRouter} from "next/router";
import {TitleStrip} from "../../../../../components/Utils/TitleStrip";
import axios from "axios";
import {getSession} from "next-auth/client";

export async function getServerSideProps(props) {
    const {req,query}=props;
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

const TimesheetDetails = (props) => {
    const {timesheet}=props;
    const router=useRouter();
    return (
        <>
            <Head>
                <title>Positions | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <TitleStrip head={{title: "Positions", desc: "Add new positions and store all position related information", action:"Add Position", action_link:`${router.asPath}/position/new`}}/>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <PositionList timesheet={timesheet}/>
                </Col>
                {/*<Col span={8}>*/}
                {/*    <TimesheetInfo/>*/}
                {/*</Col>*/}
            </Row>
        </>
    );
};

export default TimesheetDetails;

