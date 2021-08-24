import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined,PlusOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState,useEffect} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'
import {getSession} from "next-auth/client";
import axios from "axios";


function BusinessView({countryData,onEdit ,handleSelection,generalData}) {


    // console.log(generalData)

    return (
        <>
            {
                generalData &&
                <div>
                <Row justify="end">
                    <Col>
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => {
                                    handleSelection('new')
                                }}>New
                        </Button>
                    </Col>
                    <Col style={{marginLeft: '10px'}}>
                        <Button type="primary" icon={<EditOutlined/>}
                                onClick={() => {
                                    handleSelection('edit')
                                }}>Edit
                        </Button>
                    </Col>
                </Row>
                <Divider className="mt-3 mb-2"/>
                <div>
                    <Row justify={'space-around'}>
                        <Col span={12}>
                            <Title className={'mt-5'} level={5} type={'secondary'}>ACCOUNT </Title>
                            <Space direction={'vertical'} className={'mt-3'}>
                                <Space>
                                    <Text className={'text-secondary'}>Account Type : </Text>
                                    <Text className='px-2' strong>{generalData.business.business_type}</Text>
                                </Space>
                                <Space>
                                    <Text className={'text-secondary'}>Business Name : </Text>
                                    <Text className='px-2' strong>{generalData.business.business_name}</Text>
                                </Space>
                            </Space>
                            <Title level={5} type={'secondary'} style={{marginTop: '40px'}}>CONTACT INFORMATION </Title>
                            <Space justify="start" className={'mt-3'}>
                                <Text className={'text-secondary'}>Phone number : </Text>
                                <Text className='px-2' strong>{generalData.business.phone_number}</Text>
                            </Space>
                        </Col>
                        <Col>
                            <Title className={'mt-5'} level={5} type={'secondary'}>ADDRESS </Title>
                            <Space direction={'vertical'} className={'mt-3'}>
                                <Row>
                                    <Text className={'text-secondary'}>Street/Number : </Text>
                                    <Text className='px-2' strong>{generalData.business.address}</Text>
                                </Row>

                                <Space>
                                    <Text className={'text-secondary'}>ZIP : </Text>
                                    <Text className='px-2' strong>{generalData.business.pincode}</Text>
                                </Space>
                                <Space>
                                    <Text className={'text-secondary'}>City : </Text>
                                    <Text className='px-2' strong>{generalData.business.city}</Text>
                                </Space>
                                <Space>
                                    <Text className={'text-secondary'}>State : </Text>
                                    <Text className='px-2' strong>{generalData.business.state}</Text>
                                </Space>
                                <Space>
                                    <Text className={'text-secondary'}>Country : </Text>
                                    <Text className='px-2' strong>{generalData.business.country}</Text>
                                </Space>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>}
        </>
    )
}

export default BusinessView