
import * as React from 'react';
import {Button, Col, Row, Typography} from "antd";
import Link from "next/link";
import {PlusOutlined} from "@ant-design/icons";
import BreadCrumbs from "./Breadcrumb";
const { Title, Text } = Typography;

export function TitleStrip({head}) {

    return (
        <>
            <div className='mt-5 mx-5'>
                <Row justify='space-between'  className='bg-white px-5 py-2 br-5'>
                    <Col>
                        <Title level={4} >{head.title}</Title>
                        <Text className={'mt-3'} type={'secondary'}>{head.desc}</Text>
                    </Col>
                    <Col>
                        <Link href={head.action_link}>
                            <a>
                                <Button type="primary"    icon={<PlusOutlined />} > {head.action}</Button>
                            </a>
                        </Link>
                    </Col>
                    <Col span={24} className={'mt-3'}>
                        <BreadCrumbs />
                    </Col>
                </Row>
            </div>
        </>
    );
}