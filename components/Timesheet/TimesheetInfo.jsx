/*
* @created: 24/08/2021 - 11:08 AM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Card, Row, Col, Button, Divider} from "antd";

const TimesheetInfo = () => {
    return (
        <>
            <Row justify='center' align="middle" className=' py-2 br-5' layout="vertical" gutter={24}>
                <Col span={24}>
                    <div className="site-card-border-less-wrapper mt-5 mx-5" >
                        <Card title="Timesheet Information" bordered={false} style={{ width: 300 }}>
                            <p>Budget: <b>34,000 INR</b></p>
                            <p>Earnings: <b>1,25,000 INR</b></p>
                            <p>Description: <b>NA</b></p>
                            <Divider/>
                            <Button type="primary">Create Invoice</Button>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default TimesheetInfo;
