/*
* @created: 02/09/2021 - 6:39 PM
* @author: Abi
* @description: ----------------
*/
import React, {useState} from 'react'
import {Button, Typography, Col, Row} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Head from "next/head";
import {useRouter} from "next/router";
import ProjectList from "../../components/Timesheet/ProjectList";
import Breadcrumbs from "../../components/Utils/Breadcrumb";
import EmptyContainer from "../../components/Utils/EmptyContainer";
const { Title, Text } = Typography;

function Timesheet() {
    const router = useRouter();
    const [isEmpty, setIsEmpty] = useState(false);
    return (
        <>
            <Head>
                <title>Projects | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='mt-5 mx-5'>
                <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col span={8}>
                        <Title level={4}>Project</Title>
                    </Col>
                    <Col span={4} offset={11}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={()=>router.push('/project/new')}>Add Project</Button>
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
                !isEmpty && <ProjectList/>
            }
        </>
    )
}

export default Timesheet
