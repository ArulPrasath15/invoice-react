/*
* @created: 07/08/2021 - 12:10 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, Button, Select, Input} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import useClients from "../../hooks/useClients";
const {TextArea} = Input;

const { Option } = Select;

const TimesheetForm = ({data,default_business}) => {
    const [form] = Form.useForm();
    const onSubmit = async (values)=>{
        console.log(values)
    }
    return (
        <>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title="Add Timesheet" bordered={false} style={{ width: '40vw' }}>
                        <Form form={form} layout="vertical" onFinish={onSubmit}>
                            <Form.Item label="Title" name="title" required>
	                                <Input />
                            </Form.Item>
                            <Form.Item label="Description" name="desc" required>
                                <TextArea showCount maxLength={200}  />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Currency" name="currency" required>
	                                        <Select showSearch placeholder="Select Currency" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            {data.map(country => (
                                                <Option value={country.code} key={country.code}>{country.currency +' - '+country.symbol}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Budget" name="budget">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button type="primary" icon={<PlusOutlined />} htmlType="submit">Create</Button>
                            </Form.Item>
                        </Form>

                    </Card>

                </Row>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(TimesheetForm);