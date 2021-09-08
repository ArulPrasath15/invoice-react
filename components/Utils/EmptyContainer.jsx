/*
* @created: 07/09/2021 - 2:33 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Button, Empty, Row} from "antd";
import { Typography } from 'antd';
import Link from "next/link";
import {PlusOutlined} from "@ant-design/icons";
const { Title,Text } = Typography;

// TODO: Pass Props and Populate from the data

function EmptyContainer(props) {
    return (
        <>
            <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5'  style={{minHeight: '60vh'}}>
                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                       imageStyle={{height: 80,}}
                       description={<><Title level={4}>There is nothing in here</Title><Text type="secondary">Add clients to your business.</Text></>}>
                    <Link href='/'><a><Button type="primary" icon={<PlusOutlined />} > Add</Button></a></Link>
                </Empty>
            </Row>
        </>
    );
}

export default EmptyContainer;