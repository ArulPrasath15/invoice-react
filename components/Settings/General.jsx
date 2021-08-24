import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'
import BusinessView from './BusinessView'
import BusinessForm from './BusinessForm'



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
    const [showNew, setNew] = useState(false);
    const [acctype, setAcctype] = useState('Freelancer');
    const [formdata, setFormdata] = useState(tempdata);

    const onEdit = () => {
        setEditing(!editing)
        console.log(editing)
    }

    const handleSelection = (value)=>{
        switch (value){
            case 'new':setNew(true);
                       setEditing(false);
                       break;
            case 'edit':setNew(false);
                setEditing(true);
                break;
            case 'cancel':setNew(false);
                setEditing(false);
                break;

        }
    }
    const AccTypeOptions = [{ label: 'Freelancer', value: 'Freelancer' }, { label: 'Retailer', value: 'Retailer' }];

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

            {!editing && !showNew && <BusinessView onEdit={onEdit} handleSelection={handleSelection} />}
            {showNew &&
            <div>
                <Row justify="space-between">
                    <Col>
                        <Title level={4} type={'secondary'}>Add New Business</Title>
                    </Col>
                    <Col>
                        <Button className='mx-2' type="dashed" icon={<CloseOutlined />} onClick={() => {handleSelection('cancel')}}>Cancel</Button>
                    </Col>
                </Row>
                <Divider className="mt-3 mb-2"/>
                <BusinessForm countryData={countryData}/>
                </div>}
            {editing &&
            <div>
                <Form layout="vertical"
                      name="basic"
                      onFinish={onSubmit}
                >
                    <Row justify="space-between">
                        <Col>
                            <Title level={4} type={'secondary'}>Edit your general account settings</Title>
                        </Col>
                        <Col>
                            <Button type="primary" icon={<SaveOutlined />} htmlType="submit" >Save</Button>
                            <Button className='mx-2' type="dashed" icon={<CloseOutlined />} onClick={() => {onEdit()}}>Cancel</Button>
                        </Col>
                    </Row>
                    <Divider className="mt-3 mb-2"/>

                <div style={{paddingLeft:"10vw",paddingRight:"10vw"}}>

                    <Title level={5} type={'secondary'}>ACCOUNT </Title>
                    <Row justify="start" className='pt-2'>
                        <Form.Item  name="accountType" label={"Account Type"} rules={[{ required: true, message: 'Please enter Business Type ' }]}>
                            <Radio.Group className='px-0' options={AccTypeOptions} value={acctype}  onChange={onChangeAccType} optionType="button" buttonStyle="solid"/>
                        </Form.Item>
                    </Row>


                            <Form.Item  name="businessName" rules={[{ required: true, message: 'Please enter Business Name ' }]}>
                                <Input placeholder="Business Name" prefix={<ShopOutlined />}/>
                            </Form.Item>



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