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

export async function getServerSideProps({query}) {

    let {pid,tid}=query;
    let res = await axios.get(`${process.env.SERVER_URL}/isValid/project/${pid}`)
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: "/404"}}
    res = await axios.get(`${process.env.SERVER_URL}/isValid/timesheet/${tid}`)
    if(!res.data.isValid)
        return {redirect: {permanent: false, destination: "/404"}}
    return {
        props: {}, // will be passed to the page component as props
    }
}

const TimesheetDetails = () => {
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
                    <PositionList/>
                </Col>
                {/*<Col span={8}>*/}
                {/*    <TimesheetInfo/>*/}
                {/*</Col>*/}
            </Row>
        </>
    );
};

export default TimesheetDetails;

