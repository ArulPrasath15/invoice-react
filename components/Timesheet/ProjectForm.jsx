/*
* @created: 02/09/2021 - 6:52 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Form, Button, Select, Input} from "antd";
import Link from 'next/link';
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {connect} from "react-redux";

const { Option } = Select;


const ProjectForm = ({default_business}) => {
    const [clients,setClients] = useState([]);
    const [form] = Form.useForm();
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/client/${default_business._id}`);
                if(res.status == 200){
                    if(res.data.clients)
                        setClients(res.data.clients);
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[default_business._id]);

    return (
        <>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className='bg-white px-5 py-2 br-5' style={{minHeight: '60vh'}}>
                    <Card title="Add Project" bordered={false} style={{ width: '40vw' }}>
                        <Form form={form} layout="vertical" name="ProjectForm">
                            <Form.Item label="Client" name="client_id" required>
                                <Select placeholder="Select a Client" allowClear>
                                    {
                                        clients.map((client)=>{
                                            return (
                                                <option key={client._id} value={client._id}>{client.business_name}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="name" label="Title" required>
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description" required>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>Add Project</Button>
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
