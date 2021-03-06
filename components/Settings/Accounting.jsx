import {
    Row,
    Col,
    Button,
    Divider,
    Input,
    Form,
    Select,
    Empty,
    Drawer,
    Space,
    Card,
    Dropdown,
    Menu,
    Popconfirm
} from 'antd';
import { CloseOutlined, PlusOutlined, SaveOutlined,EditOutlined,DeleteTwoTone,EllipsisOutlined} from '@ant-design/icons';
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
import EmptyContainer from "../Utils/EmptyContainer";
import { Skeleton } from 'antd';

function Accounting({countryData,currentUser}) {
    const [loading, setLoading] = useState(true);
    const [banks,setBanks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBankId, setSelectedBankId] = useState();
    const [refresh, setRefresh] = useState();
    const [modelType, setModelType] = useState();
    const [disableEditor, setDisableEditor] = useState(false);
    const [form] = Form.useForm();

    useEffect(()=>{
        (async ()=>{
            setLoading(true)
            try{
                const res = await axios.get('/bank');
                if(res.status === 200){
                    if(res.data)
                    {   setBanks(res.data.bank);
                        setLoading(false)
                    }
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[refresh])

    //To open the modal for update bank
    const showUpdateModal = (value) => {
        setDisableEditor(false)
        setModelType("update")
        setSelectedBankId(value._id)
        form.setFieldsValue(value)
        setIsModalVisible(true);
    };

    //To open the modal for add bank
    const showNewModal = (value) => {
        setDisableEditor(false)
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

    //view the data in drawer
    const viewModal = (value) => {
        setDisableEditor(true);
        setModelType("view")
        form.setFieldsValue(value)
        setIsModalVisible(true);
    }

    const handleViewClose = () => {
        alert("closed")
        form.resetFields()
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

            {loading&&
               <Skeleton active />
            }

            {banks.length === 0 && loading===false &&
            <Row justify="center">
                    <div><EmptyContainer action={showNewModal} header="Add New Bank Detail" description="" /></div>
            </Row>
            }

            {banks.length > 0 &&
            <Row  justify='space-between' gutter={24}>
                {banks.map(bank=>{
                    return (
                        <Col span={11} key={bank._id} className="mt-5"  >
                            <Card hoverable title={bank.bank_name} extra={
                                <Dropdown  overlay={
                                    <Menu>
                                    <Menu.Item>
                                         <Button type="text" style={{paddingRight:"2rem"}} icon={<EditOutlined/>} onClick={() => showUpdateModal(bank)}>Edit</Button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Popconfirm  title="Are you sure to delete this Bank Account?" onConfirm={()=>deleteBank(bank._id)} okText="Yes" cancelText="No">
                                            <Button  type="dashed" danger icon={<DeleteTwoTone twoToneColor="red"/>}>Delete</Button>
                                        </Popconfirm>
                                    </Menu.Item>
                                 </Menu>}
                                   placement="bottomLeft" arrow>
                                    <Button type={'text'} icon={<EllipsisOutlined /> } />
                                </Dropdown>
                            }>
                            {/*<Collapse  bordered={true}  expandIconPosition="right" >*/}
                            {/*    <Panel header={bank.bank_name +" - "+bank.acc_holdername+" - "+bank.acc_number} key={bank._id}>*/}
                                    <BankCard bank={bank} viewModal={viewModal} deleteBank={deleteBank}  showModal={showUpdateModal} />
                                {/*</Panel>*/}
                            {/*</Collapse>*/}
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            }

            <Drawer title={modelType==="update"? "Edit Bank Details":modelType==="view"?"Bank Details":"Add New Bank Details" } name="update" width="40vw" visible={isModalVisible} closable={true} onClose={handleUpdateCancel} bodyStyle={{ paddingBottom: 20 }} >
                <fieldset disabled={disableEditor} >
                <Form layout="vertical" name="basic" form={form}  onFinish={modelType==='update' ? handleUpdateOk : handleNewOk}>
                    <Form.Item label={'Bank Name'}  name="bank_name" rules={[{required: true, message: 'Please enter your Bank Name '},]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Account Holder Name'}  name="acc_holdername" rules={[{required: true, message: 'Please enter your Account Holder Name '},]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className='pt-3'  label="Account Number" name="acc_number" rules={[{required: true, message: 'Please enter Account Number '}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Account Type'} name="acc_type" rules={[{required: true, message: "Choose your business type"}]}>
                        <Select className='w-100'>
                            <Option value="Current">Current</Option>
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
                    <Row justify={"space-between"} style={{marginBottom:"3rem"}}>
                        <Col span={11}>
                            <Form.Item label="Micr"  name="micr" rules={[{ message: 'Please enter City Name '}]}>
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

                    { modelType!=="view" &&
                    <div style={{position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid #e8e8e8', padding: '10px 16px', textAlign: 'right', left: 0, background: '#fff', borderRadius: '0 0 4px 4px',}}>
                        <Row justify={"space-around"} >
                            <Col><Button type="primary" icon={<SaveOutlined/>} htmlType="submit">Save</Button></Col>
                            <Col><Button type="dashed" icon={<CloseOutlined/>} onClick={() => handleUpdateCancel()}>Cancel</Button></Col>
                           </Row>
                    </div>}

                    {/*<Row className='mt-5' justify={"space-between"}>*/}
                    {/*    <Col>*/}
                    {/*        <Button type="primary" icon={<SaveOutlined/>} htmlType="submit" >Save</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col>*/}
                    {/*        <Button type="dashed" icon={<CloseOutlined/>} onClick={()=>handleUpdateCancel()} >Cancel</Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                </Form>
                    </fieldset>
            </Drawer>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.userStore.user,
})
const mapDispatchToProps = { }
export default connect(mapStateToProps, mapDispatchToProps)(Accounting);