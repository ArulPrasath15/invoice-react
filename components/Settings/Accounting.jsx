import {Row, Col, Button, Divider, Input, Form, Select, Empty} from 'antd';
import { CloseOutlined, PlusOutlined, SaveOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
import React, {useEffect, useState} from "react";
const { Option } = Select;
import notify from  '../../components/Utils/notify'
import axios from "axios";
import {Modal,Collapse } from "antd";
import BankCard from "./BankCard";
const { Panel } = Collapse;
import {connect} from "react-redux";

function Accounting({countryData,currentUser}) {
    const [banks,setBanks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBankId, setSelectedBankId] = useState();
    const [refresh, setRefresh] = useState();
    const [modelType, setModelType] = useState();
    const [form] = Form.useForm();

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get('/bank');
                if(res.status === 200){
                    if(res.data)
                        setBanks(res.data.bank);
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[refresh])

    //To open the modal for update bank
    const showUpdateModal = (value) => {
        setModelType("update")
        setSelectedBankId(value._id)
        form.setFieldsValue(value)
        setIsModalVisible(true);
    };

    //To open the modal for add bank
    const showNewModal = (value) => {
        setModelType("new")
        form.resetFields()
        setIsModalVisible(true);
    };

    //To handle update bank submit
    const handleUpdateOk = async () => {
        const params={'bid':selectedBankId, 'updates':form.getFieldsValue()}
        try{
            const res = await axios.put('/bank', params);
            if (res.status===200 ) {
                setRefresh(params)
                notify({type:'success',msg:'Updated successfully',des:''})
            }
            else {
                notify({type:'warning',msg:'Failed ',des:'Failed to update the Bank Details'})
            }
        }catch(err){
            notify({type:'warning',msg:'Failed ',des:'Try Again Later'})
        }
        setIsModalVisible(false);

    };

    //To handle add bank submit
    const handleNewOk = async () => {
        const params=form.getFieldsValue()
        params.user_id = currentUser._id;
        try{
            const res = await axios.post('/bank', params);
            if (res.status===200 ) {
                setRefresh(params)
                notify({type:'success',msg:'Bank Added successfully',des:''})
            }
            else {
                notify({type:'warning',msg:'Failed ',des:'Failed to update the Bank Details'})
            }
        }catch(err){
            notify({type:'warning',msg:'Failed ',des:'Try Again Later'})
        }
        setIsModalVisible(false);

    };


    const handleUpdateCancel = () => {
        setIsModalVisible(false);
    };

    //To delete the bank
    const deleteBank=async (id) =>{
        try{
            const res = await axios.delete('/bank/'+id);
            if (res.status===200 ) {
                setRefresh(res)
                notify({type:'success',msg:'Deleted successfully',des:''})
            }
            else {
                notify({type:'warning',msg:'Failed ',des:'Failed to delete the Bank Details'})
            }
        }catch(err){
            notify({type:'warning',msg:'Failed ',des:'Try Again Later'})
        }
        setIsModalVisible(false);
    }

    return (
        <>
            <Row justify="end">
                <Col>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={showNewModal}  >New</Button>
                </Col>
            </Row>
            <Divider className="mt-3 mb-2"/>

            {banks.length === 0 &&
            <Row justify='center' align="middle"  style={{minHeight: '60vh'}}>
                <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                       imageStyle={{height: 80}}
                       description={<><Title level={4}>Add Business Bank Account</Title></>}>
                </Empty>
            </Row>
            }

            {banks.length > 0 &&
            <Row  justify='space-between' gutter={24}>
                {banks.map(bank=>{
                    return (
                        <Col span={24} key={bank._id} className="mt-5">
                            <Collapse bordered={false}>
                                <Panel header={bank.bank_name +" - "+bank.acc_number} key={bank._id}>
                                    <BankCard bank={bank} deleteBank={deleteBank}  showModal={showUpdateModal} />
                                </Panel>
                            </Collapse>
                        </Col>
                    )
                })}
            </Row>
            }

            <Modal  style={{top: 20}} name="update" title={modelType==="update"? "Edit Bank Details":"Add New Bank Details" } visible={isModalVisible}  footer={null}>
                <Form layout="vertical" name="basic" form={form}  onFinish={modelType==='update' ? handleUpdateOk : handleNewOk}>
                    <Form.Item label={'Bank Name'}  name="bank_name" rules={[{required: true, message: 'Please enter your Bank Name '},]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className='pt-3'  label="Account Number" name="acc_number" rules={[{required: true, message: 'Please enter Account Number '}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Account Type'} name="acc_type" rules={[{required: true, message: "Choose your business type"}]}>
                        <Select className='w-100'>
                            <Option value="Personal">Personal</Option>
                            <Option value="Saving">Saving</Option>
                        </Select>
                    </Form.Item>
                    <Row justify={"space-between"}>
                        <Col span={11}>
                            <Form.Item label="IFSC Code" name="ifsc"  rules={[{required: true, message: 'Please enter Zip code '}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="Branch" name="branch" rules={[{required: true, message: 'Please enter City Name '}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item className='pt-3' label="Address"  name="address" rules={[{required: true, message: 'Please enter Account Number '}]}>
                        <Input/>
                    </Form.Item>
                    <Row justify={"space-between"}>
                        <Col span={11}>
                            <Form.Item label="City" name="city" rules={[{required: true, message: 'Please enter City Name '}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="Pincode" name="pincode"  rules={[{required: true, message: 'Please enter Zip code '}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"space-between"}>
                        <Col span={11}>
                            <Form.Item label="State" name="state"  rules={[{required: true, message: 'Please enter State Name '}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item name="country"  label="Country" rules={[{required: true}]}>
                                <Select placeholder="Country" allowClear showSearch
                                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {countryData.map(country => (
                                        <Option value={country.countryName}
                                                key={country.countryName}>{country.countryName}</Option>
                                    ))}
                                    <Option value={'India'}>India</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"space-between"}>
                        <Col span={11}>
                            <Form.Item label="Mirc"  name="mirc" rules={[{ message: 'Please enter City Name '}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label="Swift" name="swift" rules={[{ message: 'Please enter Zip code '}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*<Form.Item label={'Category'} initialValue={modalData.category} name="category" rules={[{ required: true , message:"Choose your category" }]}>*/}
                    {/*    <Select className='w-100'>*/}
                    {/*        <Option value="Personal">Client</Option>*/}
                    {/*    </Select>*/}
                    {/*</Form.Item>*/}

                    <Row className='mt-5' justify={"space-between"}>
                        <Col>
                            <Button type="primary" icon={<SaveOutlined/>} htmlType="submit" >Save</Button>
                        </Col>
                        <Col>
                            <Button type="dashed" icon={<CloseOutlined/>} onClick={()=>handleUpdateCancel()} >Cancel</Button>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.userStore.user,
})
const mapDispatchToProps = { }
export default connect(mapStateToProps, mapDispatchToProps)(Accounting);