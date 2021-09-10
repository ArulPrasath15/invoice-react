/*
* @created: 02/09/2021 - 6:48 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Table, Col, Row, Space, Drawer, Button, Tooltip, Popconfirm, message} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import axios from "axios";
import {connect} from "react-redux";
import ProjectForm from "./ProjectForm";
import Link from 'next/link'
import EmptyContainer from "../Utils/EmptyContainer";

const ProjectList = ({default_business}) => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [project, setProject] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/project/${default_business._id}`);
                if(res.status == 200){
                    if(res.data.projects)
                    {
                        if(res.data.projects.length > 0)
	                        setData(res.data.projects);
                        else
                            setIsEmpty(true);
                    }
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[default_business._id, refresh]);
    async function deleteProject(pid) {
        const hide=message.loading('Please wait...',0);
        try{
            const res = await axios.delete(`/project/${pid}`);
            if(res.status == 200){
                hide();
                message.success('Deleted Project',2)
                setRefresh(true);
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
        setRefresh(false);
    }
    function closeDrawer(ref)
    {
        setDrawer(false);
        if(ref)
            setRefresh(true);
        setRefresh(false);
    }
    function openDrawer(values)
    {
        setProject(values)
        setDrawer(true);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            key:'name',
            // eslint-disable-next-line react/display-name
            render: (text,record) => {
                let hf="/project/"+record._id;
                return (
                    <Link href={hf}><a>{record.name}</a></Link>
                )
            },
        },
        {
            title: 'Client',
            key:'client',
            dataIndex: ['client_id','business_name'],
            sorter: (a, b) => a.client.length - b.client.length,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key:'desc',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (record) => (
                <Space size="middle">
                    <Tooltip title="Edit" >
                        <Button style={{backgroundColor:"#D3C17A"}}  shape="circle" icon={<EditOutlined style={{color:"white"}} />} onClick={()=>{openDrawer(record)}}/>
                    </Tooltip>
                    <Popconfirm title="Are you sure?" okText="Yes! Delete" okType="danger" cancelText="Cancel" onConfirm={()=>deleteProject(record._id)}>
                    <Tooltip title="Delete" >
                        <Button style={{backgroundColor:"red"}} shape="circle" icon={ <DeleteOutlined style={{color:"white"}}  />}/>
                    </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log(pagination, filters, sorter, extra);
    }

    return (
        <>
            {
                isEmpty && <div className='mt-5 mx-5'>
                    <EmptyContainer/>
                </div>
            }
            {
                !isEmpty && <>
                    <div className='mt-5 mx-5'>
                        <Row justify='center' align="middle" className=' py-2 br-5' layout="vertical" gutter={24}>
                            <Col span={24}>
                                <Table columns={columns} dataSource={data} onChange={onChange} rowKey={project=>project._id} rowClassName='cursor-pointer'  />
                                {/* onRow={(record) => {return {onClick: () => {router.push('/project/'+record._id);}};}}*/}
                            </Col>
                        </Row>
                    </div>
                    <Drawer title="Edit Project" width={720} visible={drawer} closable={true} onClose={()=>closeDrawer(false)} bodyStyle={{ paddingBottom: 20 }} >
                        <ProjectForm project={project} closeDrawer={closeDrawer}/>
                    </Drawer>
                </>
            }

        </>
    );
};

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
