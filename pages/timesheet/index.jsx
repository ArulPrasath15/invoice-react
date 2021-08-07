import React, {useState} from 'react'
import notify from '../../components/Utils/notify';
import { Empty } from 'antd';

import {Button, Typography, Col, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Head from "next/head";
import {useRouter} from "next/router";
import TimesheetList from "../../components/Timesheet/TimesheetList";
const { Title, Text } = Typography;

function Timesheet() {
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
                    <Title level={4}>Timesheet</Title>
                </Col>
                <Col span={4} offset={11}>
                <Button type="primary" icon={<PlusOutlined />} onClick={()=>router.push('/timesheet/new')}>Add Timesheet</Button>
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
            !isEmpty && <TimesheetList/>
        }
        </>
    )
}

export default Timesheet
