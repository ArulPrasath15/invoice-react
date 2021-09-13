/*
* @created: 20/08/2021 - 7:20 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect} from 'react';
import {Button, Card, Col, DatePicker, Form, Input, message, Row, Select} from "antd";
import Link from "next/link";
import {PlusOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import axios from "axios";
import moment from "moment";
const { Option } = Select;
const { RangePicker } = DatePicker;

const PositionForm = ({position,closeDrawer}) => {
    const router=useRouter();
    const [form] = Form.useForm();
    const {tid}=router.query;
    
    useEffect(() => {
        if(position)
            form.setFieldsValue({title:position.title,timeframe:[moment(position.timeframe.from),moment(position.timeframe.to)],fee_type:position.fee_type,fee:position.fee,amount:position.amount});
    },[form, position])

    const onSubmit = async (values)=>{
        const hide=message.loading('Please wait...',0);
        values.timesheet_id=tid;
        values.timeframe={
            from:values.timeframe[0].format('YYYY-MM-DD'),
            to:values.timeframe[1].format('YYYY-MM-DD')
        }

        // try{
        //     let res;
        //     if (position) {
        //         res = await axios.put(`/position`, {id: position._id, updates: values});
        //     } else {
        //         res = await axios.post(`/position`, values);
        //     }
        //     if(res.status == 200){
        //         hide();
        //         (position)?message.success('Updated Position',2):message.success('Added New Position',2);
        //         (position)?closeDrawer(true):await router.replace('/position');
        //     }
        //     else{
        //         Error(res.data.msg)
        //     }
        // }catch (err){
        //     hide();
        //     if (!err.response) {
        //         console.log("Custom Network Error",err)
        //         message.error('Network Error');
        //     } else {
        //         message.error(err.message)
        //     }
        // }
    }

    return (
        <div>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title={(position)?"":"Add Position"} bordered={false} style={{ width: '40vw' }}>
                        <Form form={form} layout="vertical" onFinish={onSubmit}>
                            <Form.Item label="Title" name="title" required>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Time Frame" name="timeframe" required>
                                <RangePicker />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Fee Type" name="fee_type" required>
                                        <Select placeholder="Select a Type" allowClear>
                                            <Option value="fxd">Fixed</Option>
                                            <Option value="hr">Per Hour</Option>
                                            <Option value="day">Per Day</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Fee" name="fee">
                                        <Input addonAfter="INR" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Amount" name="amount">
                                      <Input  type="number"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" icon={<PlusOutlined />} htmlType="submit">Save Position</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </div>
        </div>
    );
};

export default PositionForm;
