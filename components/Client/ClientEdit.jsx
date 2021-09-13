/*
* @created: 02/09/2021 - 1:55 PM
* @author: Yash
* @description: Form component to edit client
*/
import React from 'react';
import {Row, Col, Typography, Space, Button, Form, Input, Select, message , Divider} from 'antd';
import {SaveOutlined,CloseOutlined} from '@ant-design/icons';
import axios from 'axios'
import {useRouter } from 'next/router'
const { Title, Text } = Typography;
const { Option } = Select;


function ClientEdit(props) {
    const Router  = useRouter()
    const {countryData,client,setClient,setEdit} = props


    const onSubmit = async (values)=>{
        const params = {id:client._id,updates:values};
        const hide=message.loading('Please wait...',0);
        try{
            const res = await axios.put('/client',params);
            if(res.status === 200){
                hide();
                message.success('Successfully Updated Client',2);
                setClient(res.data.client);
                setEdit(false);
            }else{
                Error(res.data.msg)
            }
        }catch (err){
            hide();
            if (!err.response) {
                message.error('Network Error',2);
            } else {
                message.error(err.message,2)
            }
        }
    }
    return (

        <Form layout="vertical" name="basic" onFinish={onSubmit}>
            <Form.Item label="Client Business Name" name="business_name" rules={[{ required: true, message: 'Please enter Client Name ' }]} initialValue={client.business_name}>
                <Input />
            </Form.Item>

            <Form.Item label="GSTIN" name="gstin" rules={[{ required: true, message: 'Please enter GSTIN ' }]} initialValue={client.gstin}>
                <Input />
            </Form.Item>

            <div>
                <Title type='secondary' level={5}>CONTACT PERSON</Title>
                <Divider />
            </div>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please enter First Name ' }]} initialValue={client.first_name}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please enter Last Name ' }]} initialValue={client.last_name}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name='email' label="Email" rules={[{ type: 'email' , message:"Please enter valid email"}, { required:true , message:"Please enter Email"}]} initialValue={client.email}>
                <Input />
            </Form.Item>
            <small className={'text-secondary'}>Invoices will be sent to this Email</small>
            <Form.Item name="phone" label="Phone Number" initialValue={client.phone}>
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <div className="mt-3">
                <Title type='secondary' level={5}>BILLING ADDRESS</Title>
                <Divider />
            </div>

            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter Street Name  ' }]} initialValue={client.address}>
                <Input />
            </Form.Item>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: 'Please enter Pincode ' }]} initialValue={client.pincode}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter City Name ' }]} initialValue={client.city}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter State Name ' }]} initialValue={client.state}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item name="country" label="Country" rules={[{ required: true }]} initialValue={client.country} >
                        <Select placeholder="Country" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {countryData.length > 0 &&
                            countryData.map(country => {
                                return (
                                    <Option value={country._id} key={country._id}>{country.code +' - '+country.symbol}</Option>
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
            <Row justify='space-between' className={'mb-5'}>
                <Col span='11'>
                    <Form.Item name='website' label="Website" initialValue={client.website}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span='11'>
                    <Form.Item name="vatid" label="VAT ID" initialValue={client.vatid}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <div style={{position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid #e8e8e8', padding: '10px 16px', textAlign: 'right', left: 0, background: '#fff', borderRadius: '0 0 4px 4px',}}>
                <Row justify={"space-around"}>
                    <Col>
                        <Form.Item style={{padding:0,margin:0}}  >
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                Save
                            </Button>
                        </Form.Item>
                    </Col>

                    <Col>
                        <Button type="dashed" icon={<CloseOutlined/>} onClick={()=>setEdit(false)} >Cancel</Button>
                    </Col>
                </Row>
            </div>
        </Form>
    );
}



export default ClientEdit;