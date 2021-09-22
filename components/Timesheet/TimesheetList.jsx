/*
* @created: 07/08/2021 - 8:50 PM
* @author: Abi
* @description: ----------------
*/
import React, {useEffect, useState} from 'react';
import {Table, Col, Row, Space, message, Tooltip, Button, Popconfirm, Drawer, Skeleton} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";
import EmptyContainer from "../Utils/EmptyContainer";
import ProjectForm from "./ProjectForm";
import TimesheetForm from "./TimesheetForm";

const TimesheetList = ({data: currency}) => {
    const router = useRouter();
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [timesheet, setTimesheet]  = useState({});
    const [refresh, setRefresh] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const {pid} = router.query;
    useEffect(()=>{
        (async ()=>{
            try{
                setLoader(true);
                const res = await axios.get(`/timesheet/${pid}`);
                if(res.status == 200){
                    if(res.data.timesheets)
                    {
                        setLoader(false);
                        if(res.data.timesheets.length > 0)
                            setData(res.data.timesheets);
                        else
                            setIsEmpty(true);
                    }
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[pid, router.query, refresh]);

    async function deleteProject(pid) {
        const hide=message.loading('Please wait...',0);
        try{
            const res = await axios.delete(`/timesheet/${pid}`);
            if(res.status == 200){
                hide();
                message.success('Deleted Timesheet',2)
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
        setTimesheet(values)
        setDrawer(true);
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            // eslint-disable-next-line react/display-name
            render: (text,record) => {
                let hf=router.asPath+"/timesheet/"+record._id;
                return (
                    <Link href={hf}><a>{record.title}</a></Link>
                )
            },
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            sorter: (a, b) => a.client.length - b.client.length,
        },
        {
            title: 'Currency',
            dataIndex: ['currency','code'],
            sorter: (a, b) => a.value - b.value,
            // eslint-disable-next-line react/display-name
            // render: (record) =>{
            //     // console.log(text)
            //     return (<span>{currency[record.currency].code +' - '+currency.text.symbol}</span>);
            // }

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
        console.log('params', pagination, filters, sorter, extra);
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
                isEmpty && loader===false &&  <div className='mt-5 mx-5'>
                    <EmptyContainer header="Add New Timesheet" description="Create Timesheet and create them to invoice" link={"/project/"+pid+"/timesheet/new"} />
                </div>
            }
            {
                !isEmpty && loader===false &&  <>
                    <div className='mt-5 mx-5'>
                        <Row justify='center' align="middle" className=' py-2 br-5' layout="vertical" gutter={24}>
                            <Col span={24}>
                                <Table columns={columns} dataSource={data} onChange={onChange} rowClassName='cursor-pointer' rowKey={timesheet=>timesheet._id} />
                            </Col>
                        </Row>
                    </div>
                    <Drawer title="Edit Project" width={720} visible={drawer} closable={true} onClose={()=>closeDrawer(false)} bodyStyle={{ paddingBottom: 20 }} >
                        <TimesheetForm timesheet={timesheet} closeDrawer={closeDrawer} data={currency}/>
                    </Drawer>
                </>
            }
        </>
    );
};


export default TimesheetList;

