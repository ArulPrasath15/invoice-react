/*
* @created: 23/08/2021 - 10:50 PM
* @author: Abi
* @description: ----------------
*/
import React, {useState} from 'react';
import PositionList from "../../../../../components/Timesheet/PositionList";
import Head from "next/head";
import {Button, Col, Row, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Breadcrumbs from "../../../../../components/Utils/Breadcrumb";
import TimesheetInfo from "../../../../../components/Timesheet/TimesheetInfo";
const {Title, Text} = Typography;
import {useRouter} from "next/router";
import EmptyContainer from "../../../../../components/Utils/EmptyContainer";


const TimesheetDetails = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const router=useRouter();
    return (
        <>
            <Head>
                <title>Timesheet | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5'>
                <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col span={8}>
                        <Title level={4}>Timesheet Details</Title>
                    </Col>
                    <Col span={4} offset={11}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={()=>router.push('/timesheet/123/positions/new')}>Add Position</Button>
                    </Col>
                </Row>
                <Row className='bg-white px-5 py-2 br-5'>
                    <Breadcrumbs/>
                </Row>
            </div>
            {
                isEmpty && <div className='mt-5 mx-5'>
                    <EmptyContainer/>
                </div>
            }
            {
                !isEmpty &&
                <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <PositionList/>
                    </Col>
                    <Col span={8}>
                        <TimesheetInfo/>
                    </Col>
                </Row>
            }
        </>
    );
};

export default TimesheetDetails;

