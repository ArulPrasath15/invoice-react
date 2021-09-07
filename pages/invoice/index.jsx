import React, {useEffect, useState} from 'react';
import {Button, Col, Input, Layout, Row, Table, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Link from "next/link";
import {connect} from "react-redux";
import axios from "axios";
import {TitleStrip} from "../../components/Utils/TitleStrip";
import Head from "next/head";

const { Search } = Input;
const {  Content } = Layout;
const { Title } = Typography;

function Invoice({default_business}) {
    const [invoices,setInvoices] = useState([]);
    const [invoiceNo,setInvoiceNo] = useState("");
    function zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/invoice/${default_business._id}`);

                if(res.status === 200){
                    if(res.data.invoices){
                        const res1 = await axios.get(`/invoice/business_id/${default_business._id}`);
                        setInvoices(res.data.invoices);
                        if(res1.status === 200){
                            setInvoiceNo((new Date().toISOString().slice(0, 10))+'-'+default_business.pretext+'-'+(zeroPad(res1.data.len+1, 4)));
                        }
                    }
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[default_business._id, default_business.pretext]);

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
            dataIndex: ['client_id','business_name']
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
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <>
            <Head>
                <title>Invoice | Penta Invoice</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <TitleStrip head={{title: "My Invoices", desc: "Add new invoices and store all invoice related information", action:"Add Invoice", action_link:`/invoice/${invoiceNo}`}}/>
        <div className="mx-5 mt-5">
           <div className='mt-5'>
                <Row justify="space-around" align="middle">
                    <Col span={7} offset={17}>
                        <Search size="large" placeholder="Search Invoice" enterButton/>
                    </Col>
                </Row>
            </div>

            <div className="bg-w mt-5">
                <Table columns={columns} className='br-5' dataSource={invoices} rowKey={invoice=>invoice.invoice_no} onChange={onChange}/>
            </div>
        </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

