/*
* @created: 20/08/2021 - 7:14 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Button, Col, Drawer, message, Popconfirm, Row, Skeleton, Space, Table, Tooltip} from "antd";
import {AppstoreAddOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import axios from "axios";
import EmptyContainer from "../Utils/EmptyContainer";
import PositionForm from "./PositionForm";
import moment from "moment";

const PositionList = ({timesheet}) => {
    const router = useRouter();
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [position, setPosition] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const {pid,tid}=router.query;
    useEffect(()=>{
        (async ()=>{
            try{
                setLoader(true);
                const res = await axios.get(`/position/${tid}`);
                if(res.status == 200){
                    if(res.data.positions)
                    {
                        setLoader(false);
                        if(res.data.positions.length > 0)
                            setData(res.data.positions);
                        else
                            setIsEmpty(true);
                    }
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[refresh, tid]);
    
    async function deletePosition(pid) {
        const hide=message.loading('Please wait...',0);
        try{
            const res = await axios.delete(`/position/${pid}`);
            if(res.status == 200){
                hide();
                message.success('Deleted Position',2)
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
        setPosition(values)
        setDrawer(true);
    }
    
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Start Date',
            dataIndex: ['timeframe','from'],
            sorter: (a, b) => a.value - b.value,
            // eslint-disable-next-line react/display-name
            render: (text) => (
                <span>{moment(text).format('DD-MM-YYYY')}</span>
            )
        },
        {
            title: 'End Date',
            dataIndex: ['timeframe','to'],
            sorter: (a, b) => a.value - b.value,
            // eslint-disable-next-line react/display-name
            render: (text) => (
                <span>{moment(text).format('DD-MM-YYYY')}</span>
            )
        },
        {
            title: 'Fee Type',
            dataIndex: 'fee_type',
            // eslint-disable-next-line react/display-name
            render: (text) => (
                <span>{(text=="fxd")?"Fixed":(text=="hr")?"Hours":(text=="day")?"Day":(text=="week")?"Week":""}</span>
            )
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
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
                    <Popconfirm title="Are you sure?" okText="Yes! Delete" okType="danger" cancelText="Cancel" onConfirm={()=>deletePosition(record._id)}>
                        <Tooltip title="Delete" >
                            <Button style={{backgroundColor:"red"}} shape="circle" icon={ <DeleteOutlined style={{color:"white"}}  />}/>
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;
    const createInvoice=()=>{
        console.log(selectedRowKeys);
    }
    return (
        <>
            {/*loader*/}
            { loader &&
                <div className={"mx-5 my-5"}>
                    <Skeleton active paragraph={{width:"5",rows:6}} title={{width:"5"}} />
                </div>
            }
            {
                isEmpty && loader===false && <div className='mt-5 mx-5'>
                    <EmptyContainer header="Add New Position" description="Create Position for timesheet and create them to invoice" link={"/project/"+pid+"/timesheet/"+tid+"/position/new"} />
                </div>
            }
            {
                !isEmpty && loader===false && <>
                    <div className='mt-5 mx-5'>
                        <div style={{ marginBottom: 16 }}>
                            <Button type="link" onClick={()=>{createInvoice()}} style={{color:"orange"}} icon={<AppstoreAddOutlined />} disabled={!hasSelected}>
                                Create Invoice
                            </Button>
                            <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                      </span>
                        </div>
                        <Row justify='center' align="middle" className=' py-2 br-5' layout="vertical" gutter={24}>
                            <Col span={24}>
                                <Table columns={columns} rowKey={project=>project._id} rowSelection={rowSelection} dataSource={data}
                                       onChange={onChange}/>
                            </Col>
                        </Row>
                    </div>
                    <Drawer title="Edit Project" width={720} visible={drawer} closable={true} onClose={()=>closeDrawer(false)} bodyStyle={{ paddingBottom: 20 }} >
                        <PositionForm timesheet={timesheet} position={position} closeDrawer={closeDrawer}/>
                    </Drawer>
                </>
            }
        </>
    );
};

export default PositionList;
