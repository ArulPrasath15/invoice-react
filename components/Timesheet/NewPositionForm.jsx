/*
* @created: 20/08/2021 - 7:20 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import Link from "next/link";
import {PlusOutlined} from "@ant-design/icons";
const { Option } = Select;
const { RangePicker } = DatePicker;

const NewPositionForm = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title="Add Position" bordered={false} style={{ width: '40vw' }}>
                        <Form form={form} layout="vertical">
                            <Form.Item label="Title" required>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Time Frame" required>
                                <RangePicker />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Fee Type" required>
                                        <Select placeholder="Select a Type" allowClear>
                                            <Option value="fxd">Fixed</Option>
                                            <Option value="hr">Per Hour</Option>
                                            <Option value="day">Per Day</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Fee">
                                        <Input addonAfter="INR" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Amount">
                                      <Input  type="number"/>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button type="primary" icon={<PlusOutlined />}>Add Position</Button>
                            </Form.Item>
                        </Form>

                    </Card>

                </Row>
            </div>
        </div>
    );
};

export default NewPositionForm;
