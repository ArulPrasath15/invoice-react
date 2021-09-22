/*
* @created: 20/08/2021 - 7:20 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, DatePicker, Form, Input, message, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import axios from "axios";
import moment from "moment";
const { Option } = Select;
const { RangePicker } = DatePicker;

//TODO: Ask for Per Hr rate when user selects that field

const PositionForm = ({position,closeDrawer,timesheet}) => {
    const router=useRouter();
    const [form] = Form.useForm();
    const {tid}=router.query;
    const [feeTypeValue, setFeeTypeValue] = useState(position.fee_type);
    useEffect(() => {
        if(position)
        {
            setFeeTypeValue(position.fee_type);
            console.log(position.amount);
            form.setFieldsValue({title:position.title,timeframe:[moment(position.timeframe.from),moment(position.timeframe.to)],fee_type:position.fee_type,fee:position.fee,amount:position.amount});
        }
    },[form, position])

    const onSubmit = async (values)=>{
        const hide=message.loading('Please wait...',0);
        values.timesheet_id=tid;
        values.timeframe={
            from:values.timeframe[0].format('YYYY-MM-DD'),
            to:values.timeframe[1].format('YYYY-MM-DD')
        }

        try{
            let res;
            if (position) {
                res = await axios.put(`/position`, {id: position._id, updates: values});
            } else {
                res = await axios.post(`/position`, values);
            }
            if(res.status == 200){
                hide();
                (position)?message.success('Updated Position',2):message.success('Added New Position',2);
                (position)?closeDrawer(true):router.back();
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
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
        message.error("Validations Failed");
    };

    return (
        <>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title={(position)?"":"Add Position"} bordered={false} style={{ width: '40vw' }}>
                        <Form form={form} layout="vertical" onFinish={onSubmit} onFinishFailed={onFinishFailed}>
                            <Form.Item label="Title" name="title" rules={[{required: true, message: 'Title is Required'},{type: 'string',message: 'Invalid Title'}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Time Frame" name="timeframe" rules={[{required: true, message: 'Timeframe is Required'}]}>
                                <RangePicker />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item label="Fee Type" name="fee_type" rules={[{required: true, message: 'Fee Type is Required'}]}>
                                        <Select placeholder="Select a Type" allowClear onChange={(value)=>setFeeTypeValue(value)}>
                                            <Option value="fxd">Fixed</Option>
                                            <Option value="hr">Per Hour</Option>
                                            <Option value="day">Per Day</Option>
                                            <Option value="week">Per Week</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Fee" name="fee" rules={[{required: true, message: 'Invalid Fee', pattern: new RegExp(/[+-]?([0-9]*[.])?[0-9]+/)},]}>
                                        <Input type="number" addonAfter={timesheet.currency.code} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={8}>

                                {(feeTypeValue != '') && <Col span={12}>
                                    <Form.Item label={(feeTypeValue != 'fxd') && "Estimated Duration" || "Amount"}
                                                rules={[{
                                        required: true,
                                        message: 'Invalid Amount',
                                        pattern: new RegExp(/[+-]?([0-9]*[.])?[0-9]+/)
                                    }]}>
                                        {feeTypeValue == "fxd" && <Form.Item name="amount" noStyle><Input type="number"/></Form.Item>}
                                        {feeTypeValue == "hr" && <Form.Item name="amount" noStyle><Input type="number" addonAfter={"Hours"}/></Form.Item>}
                                        {feeTypeValue == "day" && <Form.Item name="amount" noStyle><Input type="number" addonAfter={"Days"}/></Form.Item>}
                                        {feeTypeValue == "week" && <Form.Item name="amount" noStyle><Input type="number" addonAfter={"Weeks"}/></Form.Item>}
                                    </Form.Item>
                                </Col>}
                            </Row>
                            <Form.Item>
                                <Button type="primary" icon={<PlusOutlined />} htmlType="submit">Save Position</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </div>
        </>
    );
};

export default PositionForm;
