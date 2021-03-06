/*
* @created: 07/08/2021 - 1:55 PM
* @author: Yash
* @description: Form component to create a new client
*/
import React from 'react';
import {Row, Col, Typography, Space, Button, Form, Input, Select, message , Divider} from 'antd';
import axios from 'axios'
import {useRouter } from 'next/router'
const { Title, Text } = Typography;
const { Option } = Select;
import {connect} from 'react-redux'
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";

function ClientForm(props) {
    const Router  = useRouter()
    const {data,default_business,setEdit} = props
    const countryCode = (
        <Form.Item name="phone_code"
                   rules={[{ required: true, message: 'Please Choose Phonecode ' }]}
                   noStyle>
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

    const onSubmit = async (values)=>{
        // adding bid to post payload
        values.business_id = default_business._id;
        const hide=message.loading('Please wait...',0);
        try{
            const res = await axios.post('/client',values);
            if(res.status == 200){
                hide();
                message.success('Added New Client',2);
                await Router.reload();
            }else{
                throw Error(res.data.msg)
            }
        }catch (err){
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

        <Form
            layout="vertical"
            onFinish={onSubmit}
        >
            {/*<div className="mt-3">*/}
            {/*    <Title type='secondary' level={5}>CLIENT DETAILS</Title>*/}
            {/*    <Divider />*/}
            {/*</div>*/}
            <Form.Item label="Client Business Name" name="business_name" rules={[{ required: true, message: 'Please enter Client Name ' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="GSTIN" name="gstin" rules={[{ required: true, message: 'Please enter GSTIN ' }]}>
                <Input />
            </Form.Item>

            <div>
                <Title type='secondary' level={5}>CONTACT PERSON</Title>
                <Divider />
            </div>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please enter First Name ' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please enter Last Name ' }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name='email' label="Email" rules={[{ type: 'email' , message:"Please enter valid email"}, { required:true , message:"Please enter Email"}]}>
                <Input />
            </Form.Item>
            <small className={'text-secondary'}>Invoices will be sent to this Email</small>
            <Form.Item name="phone" label="Phone Number">
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <div className="mt-3">
                <Title type='secondary' level={5}>BILLING ADDRESS</Title>
                <Divider />
            </div>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter Street Name  ' }]}>
                <Input />
            </Form.Item>
            <Row justify={"space-between"}>
                <Col span={11}>
                    <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: 'Please enter Pincode ' }]}>
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
                    <Form.Item name="country" label="Country" rules={[{ required: true }]} >
                        <Select placeholder="Country" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
            <Row justify='space-between' className={'mb-5'}>
                <Col span='11'>
                    <Form.Item name='website' label="Website">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span='11'>
                    <Form.Item name="vatid" label="VAT ID">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <div style={{position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid #e8e8e8', padding: '10px 16px', textAlign: 'right', left: 0, background: '#fff', borderRadius: '0 0 4px 4px',}}>
                <Row justify={"space-around"}>
                    <Col>
                        <Form.Item style={{padding:0,margin:0}}  >
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                Create
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


const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);