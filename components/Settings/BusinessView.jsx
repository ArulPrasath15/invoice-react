import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined,PlusOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'


function BusinessView({countryData,onEdit ,handleSelection}) {

    const formdata = {
        accountType: "Business",
        businessName: "Vspace",
        city: "Namakkal",
        country: "India",
        phoneNumber: "+919994198353",
        state: "Tamil Nadu",
        street: "4/450 ",
        zip: "637001"
    }
    return (
        <>
            <div>
                <Row justify="end">
                    <Col>
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => {handleSelection('new')}}>New
                        </Button>
                    </Col>
                    <Col style={{marginLeft:'10px'}}>
                        <Button type="primary" icon={<EditOutlined/>}
                                onClick={() => {handleSelection('edit')}}>Edit
                        </Button>
                    </Col>
                </Row>
                <Divider className="mt-3 mb-2"/>
                <div>
                    <Row justify={'around'}>
                        <Col span={12}>
                            <Title className={'mt-5'}  level={5} type={'secondary'} >ACCOUNT </Title>
                            <Space direction={'vertical'} className={'mt-3'}>
                                <Space>
                                    <Text className={'text-secondary'}>Account Type : </Text>
                                    <Text className='px-2' strong>{formdata.accountType}</Text>
                                </Space>
                                {formdata.businessName  &&
                                <Space >
                                    <Text className={'text-secondary'}>Business Name : </Text>
                                    <Text className='px-2' strong>{formdata.businessName}</Text>
                                </Space>
                                }
                            </Space>
                            <Title level={5} type={'secondary'} style={{marginTop:'40px'}}>CONTACT INFORMATION </Title>
                            <Space justify="start" className={'mt-3'}>
                                <Text className={'text-secondary'}>Phone number : </Text>
                                <Text className='px-2' strong>{formdata.phoneNumber}</Text>
                            </Space>
                        </Col>
                        <Col>
                            <Title className={'mt-5'} level={5} type={'secondary'}>ADDRESS </Title>
                            <Space direction={'vertical'} className={'mt-3'}>
                                <Space>
                                    <Text className={'text-secondary'}>Street/Number : </Text>
                                    <Text className='px-2' strong>{formdata.street}</Text>
                                </Space>

                                <Space >
                                    <Text className={'text-secondary'}>ZIP : </Text>
                                    <Text className='px-2' strong>{formdata.zip}</Text>
                                </Space>
                                <Space>
                                    <Text className={'text-secondary'}>City : </Text>
                                    <Text className='px-2' strong>{formdata.city}</Text>
                                </Space>
                                <Space>
                                    <Text className={'text-secondary'}>State : </Text>
                                    <Text className='px-2' strong>{formdata.state}</Text>
                                </Space>
                                <Space>
                                    <Text className={'text-secondary'}>Country : </Text>
                                    <Text className='px-2' strong>{formdata.country}</Text>
                                </Space>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default BusinessView