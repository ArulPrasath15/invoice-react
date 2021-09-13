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

function EmptyContainer({header, description,action,link}) {
    return (
        <>
            {/*action for trigger a function in a parent*/}
            {/*Link for redirect to a page*/}
            <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5'  style={{minHeight: '60vh', minWidth: '80vw'}}>
                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                       imageStyle={{height: 80,}}
                       description={<><Title level={4}>{header}</Title><Text type="secondary">{description}</Text></>}>
                       {action !=null && <Button type="primary" icon={<PlusOutlined/>} onClick={()=>action()}> Add</Button>}
                      {link !=null && <Link href={link}><a><Button type="primary" icon={<PlusOutlined/>}> Add</Button></a></Link>}
                </Empty>
            </Row>
        </>
    );
}

export default EmptyContainer;