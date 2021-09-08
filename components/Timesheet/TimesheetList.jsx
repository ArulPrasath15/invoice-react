/*
* @created: 07/08/2021 - 8:50 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Table, Col, Row, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import axios from "axios";

const TimesheetList = () => {
    const router = useRouter();
    const pid=router.query['pid'];
    const [data, setData] = useState([]);
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/timesheet/${pid}`);
                if(res.status == 200){
                    if(res.data.timesheets)
                        setData(res.data.timesheets);
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[pid, router.query]);
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            sorter: (a, b) => a.client.length - b.client.length,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            sorter: (a, b) => a.ub - b.ub,
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
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className=' py-2 br-5' layout="vertical" gutter={24}>
                    <Col span={24}>
                        <Table columns={columns} dataSource={data} onChange={onChange} rowClassName='cursor-pointer' rowKey={timesheet=>timesheet._id}  onRow={(record) => {return {onClick: () => {router.push(`${router.asPath}/timesheet/${record._id}`);},};
                        }}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
};


export default TimesheetList;

