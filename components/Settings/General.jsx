import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'




function General({countryData}) {

    const tempdata={
        accountType: "Business",
        businessName: "Vspace",
        city: "Namakkal",
        country: "India",
        phoneNumber: "+919994198353",
        state: "Tamil Nadu",
        street: "4/450 ",
        zip: "637001"
    }
    const [editing, setEditing] = useState(false);
    const [acctype, setAcctype] = useState('Freelancer');
    const [formdata, setFormdata] = useState(tempdata);

    const onEdit = () => {
        setEditing(!editing)
        console.log(editing)
    }
    const AccTypeOptions = [{ label: 'Freelancer', value: 'Freelancer' }, { label: 'Business', value: 'Business' }];

    const onChangeAccType = e => {
        console.log(' checked', e.target.value);
        setAcctype(e.target.value);
    };
    const onSubmit = (values)=>{
        setFormdata(values)
        notify({type:'success',msg:'Updated successfully',des:'General settings updated successfully'})
        setEditing(!editing)
    }


    return (
        <>
            {!editing &&
            <div>
                <Row justify="end">
                    <Button type="primary" icon={<EditOutlined/>}
                            onClick={() => {onEdit()}}>Edit
                    </Button>
                </Row>
                <Divider className="mt-3 mb-2"/>
                <div style={{paddingRight:"20vw",paddingLeft:"20vw"}}>
                    <Title className={'mt-5'}  level={5} type={'secondary'} >ACCOUNT </Title>
                    <Space direction={'vertical'}>
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

                    <Title className={'mt-5'} level={5} type={'secondary'}>ADDRESS </Title>
                    <Space direction={'vertical'}>
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

                    <Title level={5} type={'secondary'} className={'mt-5'}>CONTACT INFORMATION </Title>
                    <Space justify="start">
                        <Text className={'text-secondary'}>Phone number : </Text>
                        <Text className='px-2' strong>{formdata.phoneNumber}</Text>
                    </Space>
                </div>

            </div>
            }

            {editing &&
            <div>
                <Form layout="vertical"
                      name="basic"
                      onFinish={onSubmit}
                >
                <Row justify="space-between">
                    <Col>
                        <Text className={'text-secondary'}>Edit your general account settings</Text>
                    </Col>
                    <Col>
                       <Button type="primary" icon={<SaveOutlined />} htmlType="submit" >Save</Button>
                       <Button className='mx-2' type="dashed" icon={<CloseOutlined />} onClick={() => {onEdit()}}>Cancel</Button>
                    </Col>
                </Row>
                <Divider className="mt-3 mb-2"/>

                <div style={{paddingLeft:"20vw",paddingRight:"20vw"}}>

                    <Title level={5} type={'secondary'}>ACCOUNT </Title>
                    <Row justify="start" className='pt-2'>
                        <Text className='pt-1'><span className='px-1' style={{color:"red"}}>*</span>Account Type </Text>
                        <Form.Item  name="accountType" rules={[{ required: true, message: 'Please enter Business Type ' }]}>
                            <Radio.Group className='px-5' options={AccTypeOptions} value={acctype}  onChange={onChangeAccType} optionType="button" buttonStyle="solid"/>
                        </Form.Item>

                        {acctype==='Business' &&
                        <Col>
                            <Form.Item  name="businessName" rules={[{ required: true, message: 'Please enter Business Name ' }]}>
                                <Input placeholder="Business Name" prefix={<ShopOutlined />}/>
                            </Form.Item>
                        </Col>}
                    </Row>

                    <Title level={5} type={'secondary'}>ADDRESS </Title>
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
                                <Select placeholder="Country" allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {countryData.map(country => (
                                        <Option value={country.countryName} key={country.countryName}>{country.countryName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Title level={5}  type={'secondary'}>CONTACT INFORMATION </Title>
                    <Row justify="start" className='pt-2'>
                        <Col span={12}>
                            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please enter Phone Number ' }]}>
                                <Input  />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

               </Form>
            </div>
            }
        </>
    )
}

export default General;