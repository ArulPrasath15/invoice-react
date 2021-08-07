import React from 'react';
import {Row, Col, Typography, Space, Button, Form, Input, Select, message , Divider} from 'antd';
const { Title, Text } = Typography;
const { Option } = Select;

function ClientForm(props) {

    const countryCode = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const onSubmit = (values)=>{
        console.log(values)
    }
    return (

        <Form
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
            layout="vertical"
            name="basic"
            onFinish={onSubmit}
        >

            <Form.Item
                label="Client Name"
                name="clientName"
                rules={[{ required: true, message: 'Please enter Client Name ' }]}
            >
                <Input />
            </Form.Item>

            <div>
                <Text type='secondary'>Contact Person</Text>
                <Divider />
            </div>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please enter First Name ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please enter Last Name ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name='email'
                label="Email"
                rules={[
                    { type: 'email' , message:"Please enter valid email"},
                    { required:true , message:"Please enter Email"}
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
            >
                <Input addonBefore={countryCode} style={{ width: '100%' }} />
            </Form.Item>

            <div className="mt-3">
                <Text type='secondary'>Settings</Text>
                <Divider />
            </div>
            <Form.Item name="profile" label="Profile" rules={[{ required: true }]}>
                <Select
                    placeholder="Profile Setting"
                    allowClear
                >
                    <Option value="default">Default Setting</Option>
                </Select>
            </Form.Item>

            <div className="mt-3">
                <Text type='secondary'>Billing Address</Text>
                <Divider />
            </div>

            <Form.Item
                label="Street / Number"
                name="street"
                rules={[{ required: true, message: 'Please enter Street Name  ' }]}
            >
                <Input />
            </Form.Item>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item
                        label="ZIP"
                        name="zip"
                        rules={[{ required: true, message: 'Please enter Zip code ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please enter City Name ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[{ required: true, message: 'Please enter State Name ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                        <Select
                            placeholder="Country"
                            allowClear
                        >
                            <Option value="India">India</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <div className="mt-3">
                <Text type='secondary'>Additional Info</Text>
                <Divider />
            </div>
            <Row justify='space-between'>
                <Col span='11'>
                    <Form.Item
                        name='website'
                        label="Website"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span='11'>
                    <Form.Item
                        name="vat"
                        label="VAT ID"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <div className='text-center mt-5'>
                <Form.Item >
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}

export default ClientForm;