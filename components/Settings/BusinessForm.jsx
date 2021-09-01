import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image , message} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'
import axios from "axios"
import {useRouter } from 'next/router'

function BusinessForm({countryData,redirect}){
    const Router  = useRouter()

    const onSubmit = async (values)=>{
        const hide=message.loading('Please wait...',0);
        try{
            const res = await axios.post('/business',values);
            if(res.status == 200){
                hide();
                message.success('Added Successful',2);
                Router.replace('/dashboard')
            } else{
                throw Error(res.data.msg);
            }
        }catch (err){
            console.log(err.msg)
            hide();
            if (!err.response) {
                console.log("Custom Network Error",err)
                message.error('Network Error',2);
            } else {
                message.error(err.message,2)
            }
        }
    }

    return (
        <Form layout="vertical"
            name="basic"
            onFinish={onSubmit}
            >
            <Form.Item label={'Business Name'} name="business_name" rules={[{ required: true, message: 'Please enter your Business Name ' },]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item label={'Business Type'} name="business_type" rules={[{ required: true , message:"Choose your business type"  }]}>
                <Select className='w-100'>
                    <Option value="Retailer">Retailer</Option>
                    <Option value="Freelancer">Freelancer</Option>
                </Select>
            </Form.Item>
            <Form.Item className='pt-3' label="Street / Number" name="address" rules={[{ required: true, message: 'Please enter Street Name ' }]}>
                <Input />
            </Form.Item>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: 'Please enter Zip code ' }]}>
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
                        <Select placeholder="Country" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {countryData.map(country => (
                                <Option value={country.countryName} key={country.countryName}>{country.countryName}</Option>
                            ))}
                            <Option value={'India'}>India</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className="text-center">
                <Button className="rounded-btn " shape="round" type="primary" htmlType='submit'>
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}

export default BusinessForm