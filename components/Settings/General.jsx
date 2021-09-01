import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useEffect, useState} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'
import BusinessView from './BusinessView'
import BusinessForm from './BusinessForm'
import {getSession} from "next-auth/client";
import axios from "axios";



function General({countryData}) {

    const [userId, setUserId] = useState();
    const [editing, setEditing] = useState(false);
    const [showNew, setNew] = useState(false);
    const [acctype, setAcctype] = useState('Freelancer');
    const [generalData, setGeneralData] = useState();
    const currentBusinessId="611b74c8a9a37b2a6cca07cf"

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
    const onSubmit = async(values)=> {

        const params={'bid':currentBusinessId, 'updates':values}
        try{
            const res = await axios.put('/business', params);
            if (res.status===200 && res.data.user_data ) {
                const businessData={business:res.data.user_data}
                setGeneralData(businessData)
                notify({type:'success',msg:'Updated successfully',des:'General settings updated successfully'})
                setEditing(!editing)
            }
            else {
                notify({type:'warning',msg:'Failed ',des:'General settings updation Failed'})
                setEditing(!editing)
            }
        }catch(err){
            notify({type:'warning',msg:'Failed ',des:'General settings updation Failed'})
            setEditing(!editing)
        }
    }

    useEffect(()=>{
        getSession().then(async (session,loading) => {
            if (session ) {
                setUserId(session.user.user.id)
                console.log('General User ID '+session.user.user.id)
                try{
                    const res = await axios.get('/auth/getUser/'+session.user.user.id );
                    if (res.status===200) {
                        const res = await axios.get('/business/'+currentBusinessId );
                        setGeneralData(res.data)
                    }
                }catch(err){
                }
            }
        });
    },[])


    return (
        <>

            {!editing && generalData && !showNew && <BusinessView generalData = {generalData} onEdit={onEdit} handleSelection={handleSelection} />}
            {showNew &&
            <div >
                <Row justify="space-between">
                    <Col>
                        <Title level={4} type={'secondary'}>Add New Business</Title>
                    </Col>
                    <Col>
                        <Button className='mx-2' type="dashed" icon={<CloseOutlined />} onClick={() => {handleSelection('cancel')}}>Cancel</Button>
                    </Col>
                </Row>
                <Divider className="mt-3 mb-2"/>
                <div style={{paddingLeft:"10vw",paddingRight:"10vw"}}>
                    <BusinessForm countryData={countryData}/>
                </div>
                </div>
            }

            {editing &&
            <div>
                <Form layout="vertical" name="basic" onFinish={onSubmit}>
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
                        <Form.Item  name="business_type" initialValue={generalData.business.business_type} label={"Account Type"} rules={[{ required: true, message: 'Please enter Business Type ' }]}>
                            <Radio.Group className='px-0' options={AccTypeOptions} value={acctype}  onChange={onChangeAccType} optionType="button" buttonStyle="solid"/>
                        </Form.Item>
                    </Row>
                    <Form.Item  name="business_name" initialValue={generalData.business.business_name} rules={[{ required: true, message: 'Please enter Business Name ' }]}>
                        <Input placeholder="Business Name" prefix={<ShopOutlined />}/>
                    </Form.Item>
                    <Title level={5} type={'secondary'}>ADDRESS </Title>
                    <Form.Item className='pt-3' initialValue={generalData.business.address}  label="Street / Number" name="address" rules={[{ required: true, message: 'Please enter Street Name ' }]}>
                        <Input />
                    </Form.Item>
                    <Row justify={"space-between"}>
                        <Col span={11}>
                            <Form.Item label="ZIP" initialValue={generalData.business.pincode} name="pincode" rules={[{ required: true, message: 'Please enter Zip code ' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="City" initialValue={generalData.business.city}  name="city" rules={[{ required: true, message: 'Please enter City Name ' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"space-between"}>
                        <Col span={11}>
                            <Form.Item label="State" initialValue={generalData.business.state}  name="state" rules={[{ required: true, message: 'Please enter State Name ' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item name="country" initialValue={generalData.business.country} label="Country" rules={[{ required: true }]}>
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
                            <Form.Item label="Phone Number" initialValue={generalData.business.phone_number} name="phone_number" rules={[{ required: true, message: 'Please enter Phone Number ' }]}>
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