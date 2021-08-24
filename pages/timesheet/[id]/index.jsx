/*
* @created: 23/08/2021 - 10:50 PM
* @author: Abi
* @description: ----------------
*/
import React, {useState} from 'react';
import PositionList from "../../../components/Timesheet/PositionList";
import Head from "next/head";
import {Button, Col, Empty, Row, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import Timesheet from "../index";
import TimesheetInfo from "../../../components/Timesheet/TimesheetInfo";
const {Title, Text} = Typography;

const TimesheetDetails = () => {
    const router = useRouter();
    const [isEmpty, setIsEmpty] = useState(false);
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
            </div>
            {
                isEmpty && <div className='mt-5 mx-5'>
                    <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                        <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                               imageStyle={{height: 80,}}
                               description={<><Title level={4}>Track your work time</Title><Text type="secondary">Create
                                   timesheet for different clients and turn them into invoices.</Text></>}>
                            <Button type="primary" icon={<PlusOutlined/>} onClick={()=>router.push('/timesheet/new')}>Add Timesheet</Button>
                        </Empty>
                    </Row>
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

