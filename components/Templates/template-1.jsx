/*
* @created: 08/08/2021 - 04:25 PM
* @author: Ajay R
* @description: Index Design for creating new invoice
*/

import  styles from  '../../assets/css/template.module.css'
import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Input, Table, Tooltip, Select, Menu, Dropdown, InputNumber, Spin, Form} from 'antd';
import {
    BankOutlined,
    BankTwoTone,
    DownloadOutlined, FileSyncOutlined,
    FileTextTwoTone,
    PlusOutlined,
    SendOutlined,
    UserOutlined
} from "@ant-design/icons";
import {connect} from "react-redux";
import axios from "axios";
import { Typography, Card } from 'antd';
import {useRouter} from "next/router";
import Image from 'next/image'
import {resetInvoice, setIGST, setSGST, setCGST,setITax,setSTax,setCTax} from "../../store/invoiceStore";
import useClients from "../../hooks/useClients";
import useBanks from "../../hooks/useBanks";
import { Steps } from 'antd';
import moment from 'moment';
import notify from "../Utils/notify";
import {InvoiceInfo, TemplateInfo} from "./InvoiceInfo";
const { Step } = Steps;


const { Text, Link } = Typography;
const FileSaver = require('file-saver');




function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function Template1({default_business,IGST,setIGST,SGST,setSGST,CGST,setCGST,setITax,setSTax,setCTax,iTax,sTax,cTax,resetInvoice,currencyList}) {
    const router = useRouter();
    const {data: allClients} = useClients();
    const {data: allBanks} = useBanks();
    const [form] = Form.useForm();
    const [client,setClient] = useState({});

    const [tableData, setTableData] = useState([{
        sr:1,
        desc: "",
        qty: "",
        price: "",
        amt: ""
    }]);
    const [subTotal, setSubTotal] = useState("");
    const [total, setTotalAmount] = useState("");


    const [invoiceNo,setInvoiceNo] = useState('');
    const [invoiceDate,setInvoiceDate] = useState("");
    const [invoiceDueDate,setInvoiceDueDate] = useState('');

    const [bank,setBank] = useState({});
    const [status,setStatus] = useState({
        drafted:"",
        created:"",
        sent:"",
        completed:"",
        stage:-1
    });
    const [currency,setCurrency] = useState('₹');
    const [isCreated,setIsCreated] = useState(false);
    const [loading,setLoading] = useState(false);



    useEffect(()=>{
        (async ()=>{
            setLoading(true);
                await resetInvoice({reset:true});

                try{
                    if(router.pathname==="/invoice/new"){
                        const res1 = await axios.get(`/invoice/business_id/${default_business._id}`);
                        if(res1.status === 200){
                            setInvoiceNo((new Date().toISOString().slice(0, 10))+'-'+default_business.pretext+'-'+(zeroPad(res1.data.len+1, 4)));
                        }
                        const newData = [...tableData];
                        for (let index = 0; index < tableData.length; index++) {
                            await setTotal(newData, index);
                        }
                        setTableData(newData);
                    }
                    else if(router.pathname==="/invoice/[id]"){
                        const res2 = await axios.get(`/invoice/invoice/${default_business._id}/${router.query.id}`);
                        if(res2.status === 200){
                            //Todo: Set State from added invoice
                            let inv=res2.data.invoice;
                            //
                            setInvoiceNo(inv.invoice_no);
                            form.setFieldsValue({timeframe:inv.invoice_date});
                            setInvoiceDate(inv.invoice_date);
                            setInvoiceDueDate(moment(inv.due_date).format("DD/MM/YYYY"));
                            console.log(inv)
                            console.log(allBanks)
                            console.log(allClients)
                            // // setClient(allClients.reduce(client=>client._id===inv.client_id))
                            for (const client1 of allClients) {
                                if(client1._id===inv.client_id){
                                    console.log("Match Client",inv.client_id);
                                    await setClient(client1);
                                }

                            }
                            for (const bank1 of allBanks) {
                                if(bank1._id===inv.bank_id){
                                    console.log("Match Bank",inv.bank_id);
                                    await setBank(bank1);
                                }

                            }
                            // setClient(allClients.filter(client=>client._id===inv.client_id)[0]);
                            // setBank(allBanks.filter(bank=>bank._id===inv.bank_id)[0]);

                            setTableData(inv.row_items)
                            let sum=0.00;
                            for (let index = 0; index < inv.row_items.length; index++)
                                sum+=Number((inv.row_items[index]["amt"]==="")?0:inv.row_items[index]["amt"]);
                            setSubTotal(sum.toFixed(2));
                            setIGST({igst:inv.gst.IGST})
                            setCGST({cgst:inv.gst.CGST})
                            setSGST({sgst:inv.gst.SGST})
                            setITax({t:inv.gstAmount.IGST})
                            setCTax({t:inv.gstAmount.CGST})
                            setSTax({t:inv.gstAmount.SGST})
                            setCurrency(inv.currency);
                            setTotalAmount(inv.amount);
                            setIsCreated(inv.status.stage>0);
                            if(inv.status.stage!==3){
                                inv.status.stage+=1;
                            }
                            setStatus(inv.status);


                        }
                    }

                }
                catch (e) {
                    console.error(e);
                }
            setLoading(false);
        })();
    },[allClients,allBanks]);
    function base64toBlob(base64Data, contentType = '') {
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);

        for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex += 1) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);

            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; i += 1, offset += 1) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }

            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }

        return new Blob(byteArrays, { type: contentType });
    }
    function handleClientSelect(e) {
        if(e.key!=="Add_Client"){
            allClients.forEach((client)=>{
                if(client._id===e.key){
                    setClient(client);
                }
            })
            // setClient(allClients.reduce(client=>client._id===e.key))
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
            allBanks.forEach((bank)=>{
                if(bank._id===e.key){
                    setBank(bank);
                }
            })
            // setBank(allBanks.reduce(bank=>bank._id===e.key))
        }
        else {
            router.push("../settings");
        }
    }
    const bankMenu = (
        <Menu onClick={handleBankSelect}>
            {
                allBanks.length !== 0 && allBanks.map(bank=> <Menu.Item key={bank._id} icon={<BankTwoTone />}>{ bank.bank_name}</Menu.Item>)
            }
            <Menu.Divider />
            <Menu.Item key="Add_Bank" style={{color:"#3aabf0"}}><PlusOutlined /> &nbsp;Add New Bank</Menu.Item>
        </Menu>
    );
    const handleSave=(option)=>{
        setLoading(true);

        var dt=new Date();
        let today=String(dt.getDate()).padStart(2, '0') +"-"+String(dt.getMonth()).padStart(2, '0')+"-"+dt.getFullYear()+" "+String(dt.getHours()).padStart(2, '0')+":"+String(dt.getMinutes()).padStart(2, '0');

        let stat={
            drafted:"",
            created:"",
            sent:"",
            completed:"",
            stage:-1
        }
        let currentStatus="Drafted";

        const payload = {
            business_id: default_business._id,
            client_id: client._id,
            bank_id: bank._id,
            invoice_date: new Date(invoiceDate.split("/").reverse().join("-")),
            due_date: new Date(invoiceDueDate.split("/").reverse().join("-")),
            row_items: tableData,
            gst:{
                CGST:CGST,
                SGST:SGST,
                IGST:IGST
            },
            gstAmount:{
                CGST:cTax,
                SGST:sTax,
                IGST:iTax
            },
            amount: total,
            currency:currency,
            notes: "",
            addl_fields: {},
        };


        (async ()=>{
            try{
                const isIns=await axios.post(`/invoice/invoice/${default_business._id}`,{invoiceNo:invoiceNo});
                if(isIns.data.invoice!=null){
                    // Update Invoice Detail
                    stat=isIns.data.invoice.status;
                    switch(option){
                        case 0:
                            stat.drafted=today;currentStatus="Drafted";break;
                        case 2:
                            stat.created=today;stat.sent=today;currentStatus="Drafted";break;
                        default:
                            stat.created=today;currentStatus="Created";break;
                    }
                    stat.stage=option;
                    if(option===3){
                        stat.stage=1;
                    }
                    payload.status=stat;
                    payload["currentStatus"]=currentStatus;
                    payload["option"]=option;

                    const res = await axios.put(`/invoice`,{id:isIns.data.invoice._id,updates:payload});
                    if(res.status === 200){
                        stat.stage+=1;
                        setStatus(stat)
                        notify({type:'success',msg:res.data.msg,des:''})
                        if(option===2||option===3){
                            await generateInvoice(option);
                        }
                        if(option>0){
                            setIsCreated(true);
                        }
                    }
                }
                else{
                    // Insert New Invoice
                    stat.stage=option;
                    if(option===3){
                        stat.stage=1;
                    }

                    stat.drafted=today;
                    switch(option){
                        case 0: currentStatus="Drafted";break;
                        case 2: stat.created=today;stat.sent=today;currentStatus="Sent";break;
                        default: stat.created=today;currentStatus="Created";break;
                    }

                    payload["invoice_no"]=invoiceNo;
                    payload["status"]=stat;
                    payload["currentStatus"]=currentStatus;

                    const res = await axios.post(`/invoice/`,payload);
                    if(res.status === 200){
                        stat.stage+=1;
                        setStatus(stat)
                        notify({type:'success',msg:res.data.msg,des:''})
                        if(option===2||option===3){
                            await generateInvoice(option);
                        }
                        if(option>0){
                            setIsCreated(true);
                        }

                    }
                    else{
                        Error(res.data.msg);
                    }
                }
            }catch (err){
                notify({type:'error',msg:err,des:''})
                console.log(err);
            }
        })();
        setLoading(false);


    }
    const generateInvoice=async (opt)=>{
        setLoading(true);
        try{
            var op=(opt===2)?"Send":"Download";
            const res=await axios.get(`invoice/generateInvoice/${default_business._id}/${invoiceNo}/${op}`);

            if(res.status === 200){
                if(res.data)
                {
                    if(opt===3){
                        const blobPDF = base64toBlob(res.data.pdf, 'application/pdf');
                        FileSaver.saveAs(blobPDF, `${invoiceNo}.pdf`);
                    }
                    notify({type:'success',msg:res.data.msg,des:''})
                }

            }
        }catch (err){
            console.log(err);
        }
        setLoading(false);
    }
    const saveMenu = (
        <Menu style={{fontWeight: 'bold'}}>
            <Menu.Item key="2" onClick={()=>{handleSave(2)}} icon={<SendOutlined />}>Create & Send</Menu.Item>
            <Menu.Item key="3"  onClick={()=>{handleSave(3)}} icon={<DownloadOutlined />}>Create & Download</Menu.Item>
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
        setSubTotal(sum.toFixed(2));
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
                    type="number"
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
                    type="number"
                    value={text}
                    style={{ border: "none" }}
                    prefix={currency}
                    onChange={onInputChange("price", index)}
                />
            )
        },
        {
            dataIndex: "amt",
            title: "Amount",
            width: "16%",
            // eslint-disable-next-line react/display-name
            render: (text) => {return (<h4>  {currency}&nbsp;{text}</h4>)}
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
        <Spin spinning={loading} tip="Cooking up your Invoice..."  size="large" >
        <div id="example" style={{margin: "3%"}} className={styles.template} >
            <Card size="medium" style={{width:"90%",margin:"auto"}}  className={styles.StatusBar} title={<><FileTextTwoTone  style={{ fontSize: '22px',}} />&nbsp;<span style={{opacity: 0.6}}>{invoiceNo}</span></> }
                  extra={
                      <>
                          {!isCreated && (<Button  type="dashed" onClick={()=>{handleSave(0)}} danger icon={<FileSyncOutlined />} >Save as Draft</Button>)}&nbsp;&nbsp;&nbsp;&nbsp;
                          {!isCreated &&<Dropdown.Button onClick={()=>{handleSave(1)}} type="primary" overlay={saveMenu} style={{float: "right"}} >Create & Save</Dropdown.Button>}
                          {isCreated && (<Button type="primary" onClick={()=>{generateInvoice(2)}} icon={<SendOutlined/>}>Send Invoice</Button>)}&nbsp;&nbsp;&nbsp;&nbsp;
                          {isCreated && <Button type="primary" onClick={()=>{generateInvoice(3)}} icon={<DownloadOutlined/>}>Download Invoice</Button>}
                      </>} >

                <Steps current={status.stage} percent={60}>
                    <Step title="Draft" description={status.drafted} />
                    <Step title="Created"  description={status.created} />
                    <Step title="Sent" description={status.sent}/>
                    <Step title="Completed" description={status.completed} />
                </Steps>
            </Card>

                <InvoiceInfo dataSource={tableData} currency={currency} business={default_business} subTotal={subTotal} total={total} vat={{gst:(Number(SGST)+Number(CGST)+Number(IGST)).toFixed(0),amt:(Number(sTax)+Number(cTax)+Number(iTax)).toFixed(2)}} invoice={{date:invoiceDate,no:invoiceNo,due:invoiceDueDate}} bank={bank} />

            <div  className="page-container hidden-on-narrow" style={isCreated ? {pointerEvents: "none"} : {}}>
                <Form form={form} >
                <div className={styles.pdfPage+' '+styles.sizeA4} style={{marginTop:"5%"}}>
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
                                <PlusOutlined />Select Client
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
                            <span >Invoice ID: {invoiceNo}</span><br/>

                            Invoice Date: <DatePicker onChange={(val,dateString)=>{setInvoiceDate(dateString)}} bordered={false}  disabledDate={d =>  d.isBefore(new Date().setDate(new Date().getDate() -1))}  format={"DD/MM/YYYY"}  /><br/>
                            Due Date: <DatePicker  onChange={(val,dateString)=>{setInvoiceDueDate(dateString)}} disabledDate={d => !d || d.isBefore(((invoiceDate.split('/')).reverse()).join("-"))} format={"DD/MM/YYYY"} bordered={false}/>
                        </div>
                    </div>

                    <div className={styles.pdfBody} style={{marginTop: "10%", marginBottom: "5%"}}>
                        {!isCreated &&
                        (<div className="action-btn">
                            <Tooltip title="Add Invoice Data">
                                <Button shape="circle" type="primary" icon={<PlusOutlined />} onClick={()=>{handleAdd()}} size={"small"} style={{float: 'right'}} />
                            </Tooltip>
                        </div>)}
                        <br/>

                        <Table
                            id={"template1"}
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
                                            {currency}     {subTotal}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row >


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
                                                <Option value="2.5">2.5%</Option>
                                                <Option value="6">6%</Option>
                                                <Option value="9">9%</Option>
                                                <Option value="14">14%</Option>
                                            </Select>

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {currency}     {sTax}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>

                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2} />
                                        <Table.Summary.Cell  style={{color:"grey"}}>CGST  </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            <Select  value={CGST} onChange={async (vat)=>{
                                                await setCGST({cgst:vat});
                                                if(subTotal!==''){
                                                    var t=(subTotal*(Number(vat)/100)).toFixed(2);
                                                    setCTax({t});
                                                    setTotalAmount((Number(subTotal)+Number(iTax)+Number(t)+Number(sTax)).toFixed(2))
                                                }

                                            }} style={{ width: 100}} bordered={false}>
                                                <Option value="0">0%</Option>
                                                <Option value="2.5">2.5%</Option>
                                                <Option value="6">6%</Option>
                                                <Option value="9">9%</Option>
                                                <Option value="14">14%</Option>
                                            </Select>

                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {currency}    {cTax}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
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
                                            {currency}     {iTax}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell colSpan={2} />
                                        <Table.Summary.Cell ><b>Total </b></Table.Summary.Cell>
                                        <Table.Summary.Cell >
                                            <Select placeholder="Select Currency" showSearch optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={(value)=>{setCurrency(value)}} defaultValue={currency} bordered={false}>
                                                    {currencyList.map(country => (
                                                        <Option value={country.symbol} key={country._id}>{country.code}</Option>
                                                    ))}
                                            </Select>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell>
                                            {currency}   {total}
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
                                <PlusOutlined />Select Bank Details
                            </Button>
                        </Dropdown>
                        }
                        {Object.keys(bank).length!==0  &&
                        <>
                            <b>Bank details for NEFT/IMPS</b><br/>
                            Accounts Details:<br/>
                            Bank Name: {bank.bank_name}<br/>
                            Branch: {bank.branch}<br/>
                            Account Holder Name: {bank.acc_holdername}<br/>
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
                </Form>
            </div>

        </div>
        </Spin>
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

