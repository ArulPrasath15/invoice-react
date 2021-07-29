import '../../assets/css/template.css'
import {useEffect, useState} from 'react';
import {Button, DatePicker, Input, Table, Tooltip} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {ColumnProps} from "antd/es/table";

// const TAX_RATE = 0.07;
//
//
// function ccyFormat(num) {
//     return `${num.toFixed(2)}`;
// }
//
// function priceRow(qty, unit) {
//     return qty * unit;
// }

// function subtotal(items) {
//     return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;


export default function Template1() {


    return (

        <div id="example" style={{margin: "3%"}}>

            <div className="page-container hidden-on-narrow">
                <div className="pdf-page size-a4">
                    <div className="pdf-header">
                            <span className="company-logo">
                              VSpace Consultancy
                            </span>
                        <span className="invoice-number">Invoice #23543</span>
                    </div>

                    <div className="for">
                        <h2>Invoice For </h2>
                        <p>Micheal Roy<br/>
                            1114 Freedom Lane<br/>
                            Lodi D.F., California, 95240
                        </p>
                        {/*<Select defaultValue="1" style={{ width: 200}} bordered={false} size={"large"}>*/}
                        {/*    <Option value="1">Micheal Roy<br/>1114 Freedom Lane<br/>Lodi D.F., California, 95240</Option>*/}
                        {/*    <Option value="2">Robert<br/>1114 Freedom Lane<br/>Lodi D.F., California, 95240</Option>*/}
                        {/*    <Option value="3">Alice<br/>1114 Freedom Lane<br/>Lodi D.F., California, 95240</Option>*/}

                        {/*</Select>*/}
                    </div>

                    <div className="from">
                        <h2>From</h2>
                        <p style={{paddingBottom: "20px", borderBottom: "1px solid #e5e5e5"}}>Thiyo <br/>
                            3386 Allison Avenue<br/>
                            Virginia Beach, Virginia, 23462
                        </p>
                        <p style={{paddingTop: "20px"}}>
                            Invoice ID: 23543<br/>
                            Invoice Date: <DatePicker bordered={false}/><br/>
                            Due Date: <DatePicker bordered={false}/>
                        </p>
                    </div>

                    <div className="pdf-body" style={{marginTop: "10%", marginBottom: "5%"}}>
                        <InvoiceTable1/>
                    </div>
                    <div className="pdf-bank">
                        <b>Bank details for NEFT/IMPS</b><br/>
                        Accounts Details:<br/>
                        Bank Name:<br/>
                        Branch:<br/>
                        Account Name:<br/>
                        Account No:<br/>
                        IFS Code:<br/>
                    </div>
                    <div className="pdf-footer">
                        <p>VSpace Consultancy<br/>
                            3386 Allison Avenue<br/>
                            Virginia Beach, Virginia, 23462
                        </p>
                    </div>


                </div>
            </div>

            <div className="responsive-message"></div>
        </div>
    );
}


interface IMyTableData {
    sr: string;
    desc: string;
    qty: number;
    price: number;
    amt?: number;
}

const dataSource: IMyTableData[] = [

];

const InvoiceTable1= () => {
    const [tableData, setTableData] = useState(dataSource);

    useEffect(() => {
        // Set totals on initial render
        const newData = [...tableData];
        for (let index = 0; index < tableData.length; index++) {
            setTotal(newData, index);
        }
        setTableData(newData);
    }, []);

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

    const setTotal = (data, index) => {
        // Set total
        data[index]["amt"] = Number(data[index]["qty"] * data[index]["price"]);
    };

    const onConfirm = () => {
        handleAdd();
        console.log(tableData);
    };

    const columns: ColumnProps<IMyTableData>[] = [
        {
            title: "Sr No",
            dataIndex: "sr"
        },
        {
            title: "Particulars",
            dataIndex: "desc",
            width: "30%",
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
            render: (text, record, index) => <h4>  {text}</h4>
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
    return (
        <div >
            <div className="action-btn">
                <Tooltip title="Add Invoice Data">
                    <Button shape="circle" type="primary" icon={<PlusOutlined />} onClick={onConfirm} size={"small"} style={{float: 'right'}} />
                </Tooltip>
            </div>
            <br />

            <Table
                rowKey="sr"
                columns={columns}
                dataSource={tableData}
                pagination={false}
            />

        </div>
    );
};
