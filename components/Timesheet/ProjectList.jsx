/*
* @created: 02/09/2021 - 6:48 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Table, Col, Row, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import axios from "axios";
import {connect} from "react-redux";

const ProjectList = ({default_business}) => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/project/${default_business._id}`);
                let tdata=[];
                if(res.status == 200){
                    if(res.data.projects)
                    {
                        res.data.projects.forEach((project,index) => {
                            tdata.push(
                                {
                                    key: index,
                                    id: project._id,
                                    name: project.name,
                                    client: project.client_id.business_name,
                                    description: project.desc
                                 })
                        })
                        setData(tdata);
                    }
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[default_business._id]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            sorter: (a, b) => a.client.length - b.client.length,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (record) => (
                // record.id
                <Space size="middle">
                    <EditOutlined style={{color:"#D3C17A"}}/>
                    <DeleteOutlined style={{color:"red"}}/>
                </Space>
            ),
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log(pagination, filters, sorter, extra);
    }

    return (
        <div>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className=' py-2 br-5' layout="vertical" gutter={24}>
                    <Col span={24}>
                        <Table columns={columns} dataSource={data} onChange={onChange} rowClassName='cursor-pointer'  onRow={(record) => {return {onClick: () => {console.log(record.key);router.push('/project/'+record.id);}};}}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
