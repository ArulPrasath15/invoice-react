import React from 'react';
import {Button, Card, Col, Row, Space, Typography} from "antd";
import { TeamOutlined,BellOutlined,FileDoneOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
const { Title, Text } = Typography;
import dynamic from 'next/dynamic'

const InvoiceChart = dynamic(
    () => import('./Invoice'),
    { ssr: false }
)
const ActivityChart = dynamic(
    ()=>import('./Activity'),
    {ssr:false}
)
function Dashboard(props) {

    return (
        <div className={'px-5 py-4'}>
            <Row justify={'space-between'}>
                <Col span={15}>
                    <Row justify={'space-between'}>
                        <Col span={5}>
                            <Card className={' text-center br-5 shadow'}>
                                 <TeamOutlined style={{fontSize:"30px"}} />
                                <Title type={'secondary'} level={3}>128</Title>
                                <Text type={'secondary'}>clients</Text>
                            </Card>
                        </Col>
                        <Col span={5}>
                            <Card className={' text-center br-5 shadow'}>
                                <BellOutlined style={{fontSize:"30px"}} />
                                <Title type={'secondary'} level={3}>7</Title>
                                <Text type={'secondary'}>notifications</Text>
                            </Card>
                        </Col>
                        <Col span={5}>
                            <Card className={' text-center br-5 shadow'}>
                                <FileDoneOutlined style={{fontSize:"30px"}} />
                                <Title type={'secondary'} level={3}>38</Title>
                                <Text type={'secondary'}>completed</Text>
                            </Card>
                        </Col>
                        <Col span={5}>
                            <Card className={' text-center br-5 shadow'}>
                                <ExclamationCircleOutlined style={{fontSize:"30px"}} />
                                <Title type={'secondary'} level={3}>3</Title>
                                <Text type={'secondary'}>reports</Text>
                            </Card>
                        </Col>
                    </Row>
                    <Row className={'mt-4'}>
                        <Col span={24}>
                            <Card className={'br-10 shadow'}>
                                <div className={'text-center'}>
                                    <Text type={'secondary'}>Income</Text>
                                </div>
                                <div className={'mt-2'} style={{height:'250px'}}>
                                    <InvoiceChart />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        <Col span={24}>
                            <Card className={'br-10 shadow'}>
                                <div className={'text-center'}>
                                    <Text type={'secondary'}>Invoice</Text>
                                </div>
                                <div className={'mt-2'} style={{height:'150px'}}>
                                    <InvoiceChart />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row className={'mt-4'}>
                        <Col span={24}>
                            <Card className={'br-10 shadow'}>
                                <div className={'mt-2'} style={{height:'150px'}}>
                                    <ActivityChart />
                                </div>
                                <div className={'text-center'}>
                                    <Text type={'secondary'}>Activity</Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;