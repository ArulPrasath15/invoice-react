import React, {useEffect, useState} from 'react';
import {Badge, Col, Input, Layout, Row, Skeleton, Table, Typography} from 'antd';
import Link from "next/link";
import {connect} from "react-redux";
import axios from "axios";
import {TitleStrip} from "../../components/Utils/TitleStrip";
import EmptyContainer from "../../components/Utils/EmptyContainer";
import Head from "next/head";
import moment from "moment";

const { Search } = Input;

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function Invoice({default_business}) {
    const [loader, setLoader] = useState(true);
    const [invoices,setInvoices] = useState([]);
    const [isEmpty,setIsEmpty] = useState(true);

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await axios.get(`/invoice/${default_business._id}`);
                if(res.status === 200){
                    if(res.data.invoices){
                        setLoader(false);
                        setIsEmpty(false);
                        setInvoices(res.data.invoices);
                    }
                }
            }catch (err){
                console.log(err);
            }
        })();
    },[]);

    const columns = [
        {
            title: 'Invoice No',
            dataIndex: 'invoice_no',
            // eslint-disable-next-line react/display-name
            render:(text,row)=>{
                return(
                <Link href={`/invoice/${row._id}`}>{text}</Link>
                )

            }
        },
        {
            title: 'Status',
            dataIndex: 'currentStatus',
            // eslint-disable-next-line react/display-name
            render:(text)=>{
               return  <Badge status={text==="Completed"?"success":"processing"} size="large"  text={text}/>
            }
        },
        {
            title: 'Client',
            dataIndex: ['client_id','business_name']
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoice_date',
            render:(text)=>(moment(text).format('DD-MM-YYYY'))
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
            render:(text)=>(moment(text).format('DD-MM-YYYY'))
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render:(text,row)=>{return `${row.currency} `+text}
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
            <TitleStrip head={{title: "My Invoices", desc: "Add new invoices and store all invoice related information", action:"Add Invoice", action_link:`/invoice/new`}}/>
        <div className="mx-5 mt-5">

            { loader &&
            <div className="bg-w mt-5">
                <Skeleton active paragraph={{width:"5",rows:6}} title={{width:"5"}} />
            </div>
            }
            {   loader==false &&
                <div className="bg-w mt-5">
                {
                    isEmpty ?
                        <EmptyContainer header="Add New Invoice" description="Create an invoice to send to the clients"
                                        link={"/invoice/new"}/> :
                        <Table columns={columns} className='br-5' dataSource={invoices}
                               rowKey={invoice => invoice.invoice_no} onChange={onChange}/>
                }
            </div>}
        </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

