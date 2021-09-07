/*
* @created: 08/08/2021 - 04:25 PM
* @author: Ajay R
* @description: Index Design for creating new invoice
*/

import  styles from  '../../assets/css/template.module.css'
import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Input, Table, Tooltip,Select,Menu,Dropdown} from 'antd';
import {PlusOutlined,UserOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import axios from "axios";
import { Typography, Space } from 'antd';
import {useRouter} from "next/router";
import Image from 'next/image'
import {resetInvoice, setIGST, setSGST, setCGST,setITax,setSTax,setCTax} from "../../store/invoiceStore";
import useClients from "../../hooks/useClients";



const { Text, Link } = Typography;


function Template1({default_business,IGST,setIGST,SGST,setSGST,CGST,setCGST,setITax,setSTax,setCTax,iTax,sTax,cTax,resetInvoice}) {
    const router = useRouter();
    const {data: allClients} = useClients();
    const [client,setClient] = useState({});

    const [tableData, setTableData] = useState([]);
    const [subTotal, setSubTotal] = useState("");
    const [total, setTotalAmount] = useState("");


    const [invoiceNo,setInvoiceNo] = useState('');
    const [invoiceDate,setInvoiceDate] = useState('');
    const [invoiceDueDate,setInvoiceDueDate] = useState('');

    const [allBanks,setAllBanks] = useState([]);
    const [bank,setBank] = useState({});


    useEffect(()=>{
        (async ()=>{

                await resetInvoice({reset:true});
                try{
                    const res = await axios.get('/bank');
                    if(res.status === 200){
                        if(res.data.bank)
                        {
                            console.log(res.data.bank);
                            await setAllBanks(res.data.bank);
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                }
                setInvoiceNo(router.query.id);

                const newData = [...tableData];
                for (let index = 0; index < tableData.length; index++) {
                    setTotal(newData, index);
                }
                setTableData(newData);


        })();
    },[]);

    function handleClientSelect(e) {
        if(e.key!=="Add_Client"){
            setClient(allClients.reduce(client=>client._id===e.key))
        }
        else {
            router.push("../client/new");
        }
    }
    const clientMenu = (
        <Menu onClick={handleClientSelect}>
            {
                allClients.length !== 0 && allClients.map(client=> <Menu.Item key={client._id} icon={<UserOutlined />}>{ client.business_name}</Menu.Item>)
            }
            <Menu.Divider />
            <Menu.Item key="Add_Client" style={{color:"#3aabf0"}}><PlusOutlined /> &nbsp;Add New Client</Menu.Item>
        </Menu>
    );


    function handleBankSelect(e) {
        if(e.key!=="Add_Bank"){
            setBank(allBanks.reduce(Bank=>bank._id===e.key))
        }
        else {
            //Todo: Redirect to new Bank
            router.push("../settings");
        }
    }
    const bankMenu = (
        <Menu onClick={handleBankSelect}>
            {
                allBanks.length !== 0 && allBanks.map(bank=> <Menu.Item key={bank._id} icon={<UserOutlined />}>{ bank.bank_name}</Menu.Item>)
            }
            <Menu.Divider />
            <Menu.Item key="Add_Bank" style={{color:"#3aabf0"}}><PlusOutlined /> &nbsp;Add New Bank</Menu.Item>
        </Menu>
    );
    const handleSave=(option)=>{
        const payload = {
            invoice_no: invoiceNo,
            business_id: default_business._id,
            project_id: "",
            client_id: client._id,
            amount: total,
            gst:{
                CGST:CGST,
                SGST:SGST,
                IGST:IGST
            },
            bank_id: bank._id,
            invoice_date: invoiceDate,
            credit_period: invoiceDueDate,
            row_items: tableData,
            status: option === 0 ? "created" : option === 1 ? "drafted" : option === 2 ? "sent" : "completed",
            notes: "",
            addl_fields: {},
        };
        (async ()=>{
            try{
                const res = await axios.post(`/invoice/`,payload);
                if(res.status === 200){
                    if(res)
                    {
                        console.log(res.msg);
                    }

                }
            }catch (err){
                console.log(err);
            }
        })();
    }
    const saveMenu = (
        <Menu style={{backgroundColor: "whitesmoke"}}>
            <Menu.Item key="1"><Button type="primary" block>Draft</Button></Menu.Item>
            <Menu.Item key="2"><Button type="primary" block>Create & Send</Button></Menu.Item>
            <Menu.Item key="3"><Button type="primary" block>Create & Download</Button></Menu.Item>
        </Menu>
    );
    const onInputChange = (key, index) => (e) => {
        const newData = [...tableData];
        if (key === "desc") {
            newData[index][key] = e.target.value;
        } else {
            newData[index][key] = Number(e.target.value);
            setTotal(newData, index);
        }
        setTableData(newData);
    };

    const setTotal = async (data, index) => {
        // Set total
        data[index]["amt"] = Number(data[index]["qty"] * data[index]["price"]);
        var sum=0,amt;
        for (let index = 0; index < tableData.length; index++) {
            amt=(tableData[index]["amt"]==="")?0:tableData[index]["amt"];
            sum+=Number(amt);
        }
        setSubTotal(Number(sum.toFixed(2)));
        sum=Number(sum);

        await setITax({t:(sum*(Number(IGST)/100)).toFixed(2)});
        await setSTax({t:(sum*(Number(SGST)/100)).toFixed(2)});
        await setCTax({t:(sum*(Number(CGST)/100)).toFixed(2)});

        await setTotalAmount((Number(sum)+Number(iTax)+Number(cTax)+Number(sTax)).toFixed(2))

    };


    const columns = [
        {
            title: "Sr No.",
            dataIndex: "sr",
            width: "10%"
        },
        {
            title: "Particulars",
            dataIndex: "desc",
            width: "50%",

            // eslint-disable-next-line react/display-name
            render: (text, record, index) => (
                <Input
                    value={text}
                    style={{ border: "none" }}
                    onChange={onInputChange("desc", index)}
                />
            )
        },
        {
            dataIndex: "qty",
            title: "Quantity",
            width: "12%",
            // eslint-disable-next-line react/display-name
            render: (text, record, index) => (
                <Input
                    value={text}
                    style={{ border: "none" }}
                    onChange={onInputChange("qty", index)}
                />
            )
        },
        {
            dataIndex: "price",
            title: "Unit Price",
            width: "12%",
            // eslint-disable-next-line react/display-name
            render: (text, record, index) => (
                <Input
                    value={text}
                    style={{ border: "none" }}
                    onChange={onInputChange("price", index)}
                />
            )
        },
        {
            dataIndex: "amt",
            title: "Amount",
            width: "16%",
            // eslint-disable-next-line react/display-name
            render: (text) => <h4>  {text}</h4>
        }
    ];
    const handleAdd = () => {
        const newData1 = {
            sr: tableData.length + 1,
            desc: "",
            qty: "",
            price: "",
            amt: ""
        };
        setTableData([...tableData, newData1]);
    };

    const { Option } = Select;

    return (

        <div id="example" style={{margin: "3%"}} className={styles.template}>

            <Dropdown.Button onClick={()=>{handleSave(0)}} type="primary" overlay={saveMenu} style={{float: "right"}}>Create & Save</Dropdown.Button>
            <div  className="page-container hidden-on-narrow">
                <div className={styles.pdfPage+' '+styles.sizeA4}>

                    <div className={styles.pdfHeader}>
                            <span className={styles.companyLogo}>
                                 {/*<Image src={default_business.images} alt="avatar" style={{width: '100%'}}/>*/}
                                {/*<Image src={"https://us.123rf.com/450wm/zhanna26/zhanna261709/zhanna26170900035/85712562-black-silhouette-of-cat-vector-illustration-.jpg?ver=6"} width={144} height={144} alt="avatar" style={{width: '100%'}}/>*/}
                                {default_business.business_name}
                            </span>
                        <span className={styles.invoiceNumber}>Invoice #{invoiceNo}</span>
                    </div>

                    <div className={styles.for}>
                        {Object.keys(client).length===0 &&
                        <Dropdown overlay={clientMenu}  placement="bottomLeft" arrow>
                            <Button>
                                <PlusOutlined />Add Client
                            </Button>
                        </Dropdown>
                        }
                        {Object.keys(client).length!==0 &&
                        <>
                            <h2>Invoice For </h2>

                            <p>{client.business_name}<br/>
                                {client.city} {client.pincode} .<br/>
                                <span style={{color:"black",marginTop:"30px"}}>
                                    <Text strong>GSTIN : {client.gstin}</Text><br/>
                                    <Text strong>Place of Supply - {client.state}</Text>
                                </span>
                            </p>
                        </>}
                    </div>


                    <div className={styles.from}>
                        <h2>From</h2>
                        <p style={{paddingBottom: "20px", borderBottom: "1px solid #e5e5e5"}}>
                            {default_business.business_name} <br/>
                            {default_business.address},<br/>
                            {default_business.city},  {default_business.state},  {default_business.pincode}.<br/>
                            {/*Mob :  {default_business.phone_number}*/}
                            {/*Email :  {default_business.email}*/}
                            {/*Pan :  {default_business.pan}*/}

                        </p>
                        <div style={{paddingTop: "20px"}}>
                            <span>Invoice ID: {invoiceNo}</span><br/>
                            Invoice Date: <DatePicker onChange={(val,dateString)=>{setInvoiceDate(dateString)}} bordered={false} /><br/>
                            Due Date: <DatePicker onChange={(val,dateString)=>{setInvoiceDueDate(dateString)}} disabledDate={d => !d || d.isBefore(invoiceDate)} bordered={false}/>
                        </div>
                    </div>

                    <div className={styles.pdfBody} style={{marginTop: "10%", marginBottom: "5%"}}>
                        <div className="action-btn">
                            <Tooltip title="Add Invoice Data">
                                <Button shape="circle" type="primary" icon={<PlusOutlined />} onClick={()=>{handleAdd()}} size={"small"} style={{float: 'right'}} />
                            </Tooltip>
                        </div>
                        <br />

                        <Table
                            rowKey="sr"
                            columns={columns}
                            dataSource={tableData}
                            pagination={false}
                            size="small"
                            tableLayout="unset"
                            summary={()=> (
                                <Table.Summary fixed >
                                    <Table.Summary.Row >
                                        <Table.Summary.Cell colSpan={2} />
                                        <Table.Summary.Cell colSpan={2} >
                                            <b>Sub Total</b>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {subTotal}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row >
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2} />

                                        <Table.Summary.Cell  style={{color:"grey"}}>IGST </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            <Select defaultValue={IGST}  onChange={async (vat) => {
                                                await setIGST({igst:vat});

                                                if (subTotal !== '') {

                                                    let t=(Number(subTotal) * (Number(vat) / 100)).toFixed(2);
                                                    await setITax({t});
                                                    await setTotalAmount((Number(subTotal)+Number(t)+Number(cTax)+Number(sTax)).toFixed(2))
                                                }

                                            }} style={{ width: 100}} bordered={false}>
                                                <Option value="0">0%</Option>
                                                <Option value="5">5%</Option>
                                                <Option value="12">12%</Option>
                                                <Option value="18">18%</Option>
                                                <Option value="28">28%</Option>
                                            </Select>

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {iTax}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>

                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2} />

                                        <Table.Summary.Cell  style={{color:"grey"}}>SGST</Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            <Select defaultValue={SGST}  onChange={async (vat)=>{
                                              await  setSGST({sgst:vat});
                                                if(subTotal!==''){
                                                    var t=(subTotal*(Number(vat)/100)).toFixed(2);
                                                    await setSTax({t});

                                                    await setTotalAmount((Number(subTotal)+Number(iTax)+Number(cTax)+Number(t)).toFixed(2))
                                                }

                                            }} style={{ width: 100}} bordered={false}>
                                                <Option value="0">0%</Option>
                                                <Option value="5">5%</Option>
                                                <Option value="12">12%</Option>
                                                <Option value="18">18%</Option>
                                                <Option value="28">28%</Option>
                                            </Select>

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {sTax}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>

                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2} />

                                        <Table.Summary.Cell  style={{color:"grey"}}>CGST  </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            <Select defaultValue={CGST}  onChange={async (vat)=>{
                                                await setCGST({cgst:vat});
                                                if(subTotal!==''){
                                                    var t=(subTotal*(Number(vat)/100)).toFixed(2);
                                                    setCTax({t});
                                                    setTotalAmount((Number(subTotal)+Number(iTax)+Number(t)+Number(sTax)).toFixed(2))
                                                }

                                            }} style={{ width: 100}} bordered={false}>
                                                <Option value="0">0%</Option>
                                                <Option value="5">5%</Option>
                                                <Option value="12">12%</Option>
                                                <Option value="18">18%</Option>
                                                <Option value="28">28%</Option>
                                            </Select>

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {cTax}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>

                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2} />
                                        <Table.Summary.Cell colSpan={2} ><b>Total </b></Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {total}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
                    </div>

                    <div className={styles.pdfBank}>
                        {Object.keys(bank).length===0 &&
                        <Dropdown overlay={bankMenu}  placement="bottomLeft" arrow>
                            <Button>
                                <PlusOutlined />Add Bank Details
                            </Button>
                        </Dropdown>
                        }
                        {Object.keys(bank).length!==0  &&
                        <>
                            <b>Bank details for NEFT/IMPS</b><br/>
                            Accounts Details:<br/>
                            Bank Name: {bank.bank_name}<br/>
                            Branch: {bank.branch}<br/>
                            Account No: {bank.acc_number}<br/>
                            IFSC Code: {bank.ifsc}<br/>
                            Account Type: {bank.acc_type}<br/>
                        </>}

                    </div>
                    <div className={styles.pdfFooter}>
                        <p>  {default_business.business_name} <br/>
                            {default_business.address},<br/>
                            {default_business.city},  {default_business.state},  {default_business.pincode}.<br/>
                        </p>
                    </div>


                </div>

            </div>

        </div>
    );
}





const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
    IGST:state.invoiceStore.igst,
    SGST:state.invoiceStore.sgst,
    CGST:state.invoiceStore.cgst,
    iTax:state.invoiceStore.itax,
    sTax:state.invoiceStore.stax,
    cTax:state.invoiceStore.ctax,
    total:state.invoiceStore.total,
    tableData:state.invoiceStore.tableData,
})

const mapDispatchToProps ={setIGST,setSGST,setCGST,setITax,setSTax,setCTax,resetInvoice }


export default connect(mapStateToProps, mapDispatchToProps)(Template1);

