/*
* @created: 20/08/2021 - 6:56 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import Head from "next/head";
import {Button, Col, Popconfirm, Row, Typography} from "antd";
import {useRouter} from "next/router";
import TimesheetForm from "../../../../components/Timesheet/TimesheetForm";
import PositionList from "../../../../components/Timesheet/PositionList";
import {PlusOutlined} from "@ant-design/icons";
import Link from "next/link";
const { Title, Text } = Typography;

const TimesheetDetail = () => {
    const router = useRouter();
    const closeForm = ()=>{
        router.push('/timesheet')
    }
    return (
        <>
            <Head>
                <title>New Position | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5'>
                <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col span={8}>
                        <Title level={4}  >Create New Position</Title>
                    </Col>
                    <Col span={3} offset={12}>
                        <Link href='/timesheet/1234/position/new'>
                            <a>
                                <Button type="primary"    icon={<PlusOutlined />} > Add Position</Button>
                            </a>
                        </Link>
                    </Col>
                </Row>
                {/*<div>*/}
                    {/*<Row >*/}
                        {/*<Col span={24} className='bg-white mt-5 mb-5 py-5 px-5 br-5'>*/}

                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
            </div>
            <PositionList/>
        </>
    );
};

export default TimesheetDetail;
