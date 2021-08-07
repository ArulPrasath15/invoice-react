import {Row, Col, Button, Divider, Radio, Input, Form, Select} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState} from "react";
export function General() {
    const [editing, setEditing] = useState(false);
    const [acctype, setAcctype] = useState('Freelancer');

    const onEdit = () => {
        setEditing(!editing)
        console.log(editing)
    }
    const AccTypeOptions = [
        { label: 'Freelancer', value: 'Freelancer' },
        { label: 'Business', value: 'Business' }
    ];
    const onChangeAccType = e => {
        console.log(' checked', e.target.value);
        setAcctype(e.target.value);
    };
    const onSubmit = (values)=>{
        console.log(values)
    }
    return (
        <>
            {!editing &&
            <div>
                    <Row justify="end"><Button type="primary" icon={<EditOutlined/>} onClick={() => {
                        onEdit()
                    }}>Edit</Button></Row>
                    <Divider className="mt-3 mb-2"/>

                    <Row><Title level={5}>ACCOUNT </Title></Row>
                    <hr className={Styles.hr}/>
                    <Row justify="start">
                        <Text>Account Type : </Text>
                        <Text className='px-2' strong>Freelancer</Text>
                    </Row>

                    <Row className='pt-5'><Title level={5}>ADDRESS </Title></Row>
                    <hr className={Styles.hr}/>
                    <Row justify="start" className='pt-1'>
                        <Text>Street/Number : </Text>
                        <Text className='px-2' strong>5/450</Text>
                    </Row>
                    <Row justify="start" className='pt-1'>
                        <Text>ZIP : </Text>
                        <Text className='px-2' strong>637001</Text>
                    </Row>
                    <Row justify="start" className='pt-1'>
                        <Text>City : </Text>
                        <Text className='px-2' strong>Namakkal</Text>
                    </Row>
                    <Row justify="start" className='pt-1'>
                        <Text>State : </Text>
                        <Text className='px-2' strong>Tamil Nadu</Text>
                    </Row>
                    <Row justify="start" className='pt-1'>
                        <Text>Country : </Text>
                        <Text className='px-2' strong>India</Text>
                    </Row>

                    <Row className='pt-5'><Title level={5}>CONTACT INFORMATION </Title></Row>
                    <hr className={Styles.hr}/>
                    <Row justify="start">
                        <Text>Phone number : </Text>
                        <Text className='px-2' strong>9994646466</Text>
                    </Row>
            </div>
            }

            {editing &&
            <div>
                <Form layout="vertical"
                      name="basic"
                      onFinish={onSubmit}>
                <Row justify="space-between">
                    <Col>
                        <Text>Edit your general account settings</Text>
                    </Col>
                   <Col>
                       <Button type="primary" icon={<SaveOutlined />} htmlType="submit" >Save</Button>
                       <Button className='mx-2' type="dashed" icon={<CloseOutlined />} onClick={() => {onEdit()}}>Cancel</Button>
                   </Col>
                </Row>
                <Divider className="mt-3 mb-2"/>

                <Row><Title level={5}>ACCOUNT </Title></Row>
                <hr className={Styles.hr}/>
                <Row justify="start" className='pt-2'>
                    <Text className='pt-1'>Account Type </Text>
                    <Form.Item  name="acctType" rules={[{ required: true, message: 'Please enter Business Type ' }]}>
                        <Radio.Group className='px-5' options={AccTypeOptions} value={acctype} onChange={onChangeAccType} optionType="button"/>
                    </Form.Item>
                    {acctype==='Business' &&
                    <Col>
                        <Form.Item  name="businessname" rules={[{ required: true, message: 'Please enter Business Name ' }]}>
                            <Input placeholder="Business Name" prefix={<ShopOutlined />}/>
                        </Form.Item>

                    </Col>}
                </Row>

                <Row className='pt-4'> <Title level={5}>ADDRESS </Title></Row>
                <hr className={Styles.hr}  />
                <Form.Item className='pt-3' label="Street / Number" name="street" rules={[{ required: true, message: 'Please enter Street Name ' }]}>
                    <Input />
                </Form.Item>
                <Row justify={"space-between"}>
                    <Col span={11}>
                        <Form.Item label="ZIP" name="zip" rules={[{ required: true, message: 'Please enter Zip code ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter City Name ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
                    <Col span={11}>
                        <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter State Name ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                            <Select placeholder="Country" allowClear>
                                <Option value="India">India</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row><Title level={5}>CONTACT INFORMATION </Title></Row>
                <hr className={Styles.hr}/>
                <Row justify="start" className='pt-2'>
                    <Col span={11}>
                        <Form.Item label="Phone Number" name="phonenumber" rules={[{ required: true, message: 'Please enter Phone Number ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                </Form>
            </div>
            }
        </>
    )
}