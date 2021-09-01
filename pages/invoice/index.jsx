import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Layout, Row, Table, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Link from "next/link";
import {connect} from "react-redux";
import axios from "axios";

const { Search } = Input;
const {  Content } = Layout;
const { Title } = Typography;

function Invoice({default_business}) {
    const [invoices,setInvoices] = useState([]);
    const [invoiceNo,setInvoiceNo] = useState("");
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/invoice/${default_business._id}`);
                if(res.status === 200){
                    if(res.data.invoices)
                        setInvoices(res.data.invoices);

                    setInvoiceNo(Math.floor(Math.random() * (99999 - 10000)) + 10000);
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[]);

    const columns = [
        {
            title: 'Invoice No',
            dataIndex: 'invoice_no'
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Client',
            dataIndex: 'client_id'
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoice_date',
        },
        {
            title: 'Due Date',
            dataIndex: 'credit_period',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },

    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'Index York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div className="mx-5 mt-5">
            <Row justify='space-between' className='bg-white px-5 py-2 br-5'>
                <Col span={8}>
                    <Title level={4}>Invoice</Title>
                </Col>
                <Col span={3} offset={12}>

                    <Link href={`/invoice/${invoiceNo}`}><Button type="primary" icon={<PlusOutlined/>}> Add
                        Invoice</Button></Link>
                </Col>
            </Row>
            <div className='mt-5'>
                <Row justify="space-around" align="middle">
                    <Col span={7} offset={17}>
                        <Search size="large" placeholder="Search Invoice" enterButton/>
                    </Col>
                </Row>
            </div>

            <div className="bg-w mt-5">
                <Table columns={columns} className='br-5' dataSource={invoices} onChange={onChange}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

