import {Row, Col, Button, Divider, Radio, Input, Form, Select} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'


function Accounting({countryData}) {

    const tempdata={
        accountHolder:"Penta",
        bankName: "ABC",
        countryofbank: "India",
        accountNumber: "1234567890",
        swift_bic: "Not Set",
        ifsc: "ABC00001234",
        state: "Tamil Nadu",
        taxid: "12345 ",
        vatid: "12345"
    }
    const [editing, setEditing] = useState(false);
    const [acctype, setAcctype] = useState('Freelancer');
    const [formdata, setFormdata] = useState(tempdata);

    const onEdit = () => {
        setEditing(!editing)
        console.log(editing)
    }
    const onSubmit = (values)=>{
        setFormdata(values)
        notify({type:'success',msg:'Updated successfully',des:'General settings updated successfully'})
        setEditing(!editing)
    }


    return (
        <>
            {!editing &&
            <div>
                <Row justify="end"><Button type="primary" icon={<EditOutlined/>} onClick={() => {
                    onEdit()
                }}>Edit</Button></Row>
                <Divider className="mt-3 mb-2"/>
                <div style={{paddingLeft:"20vw",paddingRight:"20vw"}}>
                        <Row><Title level={5}>Bank Details </Title></Row>
                        <hr className={Styles.hr}/>
                        <Row justify="start">
                            <Text>Account Holder : </Text>
                            <Text className='px-2' strong>{formdata.accountHolder}</Text>
                        </Row>
                        <Row justify="start">
                            <Text>Bank Name : </Text>
                            <Text className='px-2' strong>{formdata.bankName}</Text>
                        </Row>
                        <Row justify="start">
                            <Text>Country of Bank : </Text>
                            <Text className='px-2' strong>{formdata.countryofbank}</Text>
                        </Row>
                        <Row justify="start">
                            <Text>Account Number : </Text>
                            <Text className='px-2' strong>{formdata.accountNumber}</Text>
                        </Row>
                        <Row justify="start">
                            <Text>SWIFT/BIC : </Text>
                            <Text className='px-2' strong>{formdata.swift_bic}</Text>
                        </Row>
                        <Row justify="start">
                            <Text>IFSC : </Text>
                            <Text className='px-2' strong>{formdata.ifsc}</Text>
                        </Row>
                        <Row className='pt-5'><Title level={5}>Taxes </Title></Row>
                        <hr className={Styles.hr}/>
                        <Row justify="start" className='pt-1'>
                            <Text>Tax ID : </Text>
                            <Text className='px-2' strong>{formdata.taxid}</Text>
                        </Row>
                        <Row justify="start" className='pt-1'>
                            <Text>VAT ID : </Text>
                            <Text className='px-2' strong>{formdata.vatid}</Text>
                        </Row>
                    </div>

            </div>
            }

            {editing &&
            <div>
                <Form layout="vertical"
                      name="basic"
                      onFinish={onSubmit}>
                <Row justify="space-between">
                    <Col>
                        <Text>Edit your accounting settings</Text>
                    </Col>
                   <Col>
                       <Button type="primary" icon={<SaveOutlined />} htmlType="submit" >Save</Button>
                       <Button className='mx-2' type="dashed" icon={<CloseOutlined />} onClick={() => {onEdit()}}>Cancel</Button>
                   </Col>
                </Row>
                <Divider className="mt-3 mb-2"/>

                    <div style={{paddingLeft:"20vw",paddingRight:"20vw"}}>
                <Row className='pt-4'> <Title level={5}>BANK DETAILS </Title></Row>
                <hr className={Styles.hr}  />
                <Row justify={"space-between"}>
                    <Col span={11}>
                        <Form.Item label="Account Holder" name="accountHolder" rules={[{ required: true, message: 'Please enter Account Holder ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Bank Name" name="bankName" rules={[{ required: true, message: 'Please enter Bank Name ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className='pt-3' label="Account Number" name="accountNumber" rules={[{ required: true, message: 'Please enter Account Holder ' }]}>
                    <Input />
                </Form.Item>
                <Row justify={"space-between"}>
                    <Col span={11}>
                        <Form.Item label="IFSC" name="ifsc" rules={[{ required: true, message: 'Please enter IFSC Code ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="SWIFT/BIC" name="swift_bic" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
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
                <Row><Title level={5}>TAXES </Title></Row>
                <hr className={Styles.hr}/>
                <Row justify="space-between" className='pt-2'>
                <Col span={11}>
                        <Form.Item label="Tax ID" name="taxid" rules={[{ required: true, message: 'Please enter Tax ID ' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="VAT ID" name="vatid" rules={[{ required: false }]}>
                            <Input />
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

export default Accounting;