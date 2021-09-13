/*
* @created: 07/08/2021 - 12:10 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, Button, Select, Input, message, InputNumber} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import axios from "axios";
const {TextArea} = Input;
const { Option } = Select;

const TimesheetForm = ({data,timesheet,closeDrawer}) => {
    const [form] = Form.useForm();
    const router=useRouter();
    const {pid}=router.query;
    useEffect(() => {
        if(timesheet)
            form.setFieldsValue({project_id:timesheet.project_id,title:timesheet.title,desc:timesheet.desc,currency:timesheet.currency._id,budget:timesheet.budget});
    },[form, timesheet])

    const onSubmit = async (values)=>{
        const hide=message.loading('Please wait...',0);
        values.project_id=pid;

        try{
            let res;
            if (timesheet) {
                res = await axios.put(`/timesheet`, {id: timesheet._id, updates: values});
            } else {
                res = await axios.post(`/timesheet`, values);
            }
            if(res.status == 200){
                hide();
                (timesheet)?message.success('Updated Timesheet',2):message.success('Added New Project',2);
                (timesheet)?closeDrawer(true):router.replace(`/project/${pid}`);
            }
            else{
                Error(res.data.msg)
            }
        }catch (err){
            hide();
            if (!err.response) {
                console.log("Custom Network Error",err)
                message.error('Network Error');
            } else {
                message.error(err.message)
            }
        }
    }

    return (
        <>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title={(timesheet)?"":"Add Timesheet"} bordered={false} style={{ width: '40vw' }}>
                        <Form form={form} layout="vertical" onFinish={onSubmit}>
                            <Form.Item label="Title" name="title" required>
	                                <Input />
                            </Form.Item>
                            <Form.Item label="Description" name="desc" required>
                                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} showCount maxLength={200}  />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Currency" name="currency" required>
	                                        <Select showSearch placeholder="Select Currency" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            {data.map(country => (
                                                <Option value={country._id} key={country._id}>{country.code +' - '+country.symbol}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Budget" name="budget">
                                        <InputNumber prefix={<span>$</span>} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" icon={<PlusOutlined />} htmlType="submit">Save Timesheet</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </div>
        </>
    );
};


export default TimesheetForm;