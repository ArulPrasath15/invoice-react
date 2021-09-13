/*
* @created: 02/09/2021 - 6:52 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, Button, Select, Input, message} from "antd";
import Link from 'next/link';
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {connect} from "react-redux";
import useClients from "../../hooks/useClients";
import {useRouter} from "next/router";

const { Option } = Select;
const { TextArea } = Input;

const ProjectForm = ({default_business, project, closeDrawer}) => {
    const router=useRouter();
    const [form] = Form.useForm();
    const {data:clients}=useClients();


    useEffect(() => {
        if(project)
            form.setFieldsValue({client_id:project.client_id._id,name:project.name,desc:project.desc});
    },[form, project])


    const onSubmit = async (values)=>{
        const hide=message.loading('Please wait...',0);
        values.business_id=default_business._id;

        try{
            let res;
            if (project) {
                res = await axios.put(`/project`, {id: project._id, updates: values});
            } else {
                res = await axios.post(`/project`, values);
            }
            if(res.status == 200){
                hide();
                (project)?message.success('Updated Project',2):message.success('Added New Project',2);
                (project)?closeDrawer(true):await router.replace('/project');
            }
            else{
                Error(res.data.msg)
            }
        }catch (err){
            hide();
            if (!err.response) {
                console.log("Custom Network Error",err)
                message.error('Network Error');
            } else {
                message.error(err.message)
            }
        }
    }

    return (
        <>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title={(project)?"":"Add Project"} bordered={false} style={{ width: '40vw' }} >
                        <Form layout="vertical" name="ProjectForm" onFinish={onSubmit} form={form}>
                            <Form.Item label="Client" name="client_id" required >
                                <Select placeholder="Select a Client" allowClear>
                                    {clients.map((client)=>{return (<Option key={client._id} value={client._id}>{client.business_name}</Option>)})}
                                </Select>
                            </Form.Item>
                            <Form.Item name="name" label="Title" required >
                                <Input />
                            </Form.Item>
                            <Form.Item name="desc" label="Description" required >
                                <TextArea placeholder="Type your description here...." autoSize={{ minRows: 3, maxRows: 5 }}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>Save Project</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
