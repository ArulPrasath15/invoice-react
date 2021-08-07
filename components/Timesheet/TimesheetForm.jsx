/*
* @created: 07/08/2021 - 12:10 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Row, Col, Card, Form, Button, Select, Input} from "antd";
import Link from 'next/link';
import {PlusOutlined} from "@ant-design/icons";

const { Option } = Select;

const TimesheetForm = () => {

    const [form] = Form.useForm();


    return (
        <>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title="Add Timesheet" bordered={false} style={{ width: '40vw' }}>
                        <Form
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item label="Client" required>
                                <Select placeholder="Select a Client" allowClear>
                                    <Option value="male">Client 1</Option>
                                    <Option value="female">Client 2</Option>
                                    <Option value="other"><Link href="#">Add Client</Link></Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Title" required>
	                                <Input />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Currency" required>
                                        <Select showSearch placeholder="Select a person" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="tom">Tom</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Budget" requiredMark={'optional'}>
                                        <Input placeholder="Title" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button type="primary" icon={<PlusOutlined />}>Create</Button>
                            </Form.Item>
                        </Form>

                    </Card>

                </Row>
            </div>
        </>
    );
};

export default TimesheetForm;
