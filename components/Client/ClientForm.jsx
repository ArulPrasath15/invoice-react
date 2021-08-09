/*
* @created: 07/08/2021 - 1:55 PM
* @author: Yash
* @description: Form component to create a new client
*/
import React from 'react';
import {Row, Col, Typography, Space, Button, Form, Input, Select, message , Divider} from 'antd';
const { Title, Text } = Typography;
const { Option } = Select;

function ClientForm(props) {
    const {data} = props
    const countryCode = (
        <Form.Item name="phoneCode" noStyle>
            <Select style={{ width: 100 }}>
                {data.length > 0 &&
                    data.map(country => {
                        return (
                            <Option value={country.callingCode} key={country.code}> {country.code} {country.callingCode}</Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    );

    const onSubmit = (values)=>{
        // post from here
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
            <div className="mt-3">
                <Title type='secondary' level={5}>CLIENT DETAILS</Title>
                <Divider />
            </div>
            <Form.Item
                label="Client Name"
                name="clientName"
                rules={[{ required: true, message: 'Please enter Client Name ' }]}
            >
                <Input />
            </Form.Item>

            <div>
                <Title type='secondary' level={5}>CONTACT PERSON</Title>
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
                <Title type='secondary' level={5}>SETTINGS </Title>
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
                <Title type='secondary' level={5}>BILLING ADDRESS</Title>
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
                            {data.length > 0 &&
                            data.map(country => {
                                return (
                                    <Option value={country.name} key={country.code}>{country.name}</Option>
                                )
                            })
                            }
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <div className="mt-3">
                <Title type='secondary' level={5}>ADDITIONAL INFO</Title>
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
            <div className='mt-5'>
                <Form.Item >
                    <Button type="primary" htmlType="submit" shape='round'>
                        Create Client
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}

export default ClientForm;