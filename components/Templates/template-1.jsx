import  styles from  '../../assets/css/template.module.css'
import {useEffect, useState,cloneElement} from 'react';
import {Button, DatePicker, Input, Table, Tooltip,Select,Option,Popover,Menu,Dropdown} from 'antd';
import {PlusOutlined} from "@ant-design/icons";


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
    const client="";
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a >VSpace</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a >Pentafox</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" style={{color:"#3aabf0"}}><PlusOutlined /> &nbsp;Add New Client</Menu.Item>
        </Menu>
    );

    return (

        <div id="example" style={{margin: "3%"}} className={styles.template}>
            <div  className="page-container hidden-on-narrow">
                <div className={styles.pdfPage+' '+styles.sizeA4}>

                    <div className={styles.pdfHeader}>
                            <span className={styles.companyLogo}>
                              VSpace Consultancy
                            </span>
                            <span className={styles.invoiceNumber}>Invoice #23543</span>
                    </div>

                    <div className={styles.for}>
                        {client==""&&
                        <Dropdown overlay={menu}  placement="bottomLeft" arrow>
                            <Button>
                                <PlusOutlined />Add Client
                            </Button>
                        </Dropdown>
                        }
                        {client!="" &&
                        <><h2>Invoice For </h2>
                        <p>Micheal Roy<br/>
                            1114 Freedom Lane<br/>
                            Lodi D.F., California, 95240
                        </p></>}
                    </div>


                    <div className={styles.from}>
                        <h2>From</h2>
                        <p style={{paddingBottom: "20px", borderBottom: "1px solid #e5e5e5"}}>Thiyo <br/>
                            3386 Allison Avenue<br/>
                            Virginia Beach, Virginia, 23462
                        </p>
                        <p style={{paddingTop: "20px"}}>
                            <label>Invoice ID: 23543</label><br/>
                            Invoice Date: <DatePicker bordered={false} /><br/>
                            Due Date: <DatePicker bordered={false}/>
                        </p>
                    </div>

                    <div className={styles.pdfBody} style={{marginTop: "10%", marginBottom: "5%"}}>
                        <InvoiceTable1/>
                    </div>
                    <div className={styles.pdfBank}>
                        <b>Bank details for NEFT/IMPS</b><br/>
                        Accounts Details:<br/>
                        Bank Name:<br/>
                        Branch:<br/>
                        Account Name:<br/>
                        Account No:<br/>
                        IFS Code:<br/>
                    </div>
                    <div className={styles.pdfFooter}>
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


const dataSource=[];

const InvoiceTable1= () => {
    const [tableData, setTableData] = useState(dataSource);

    useEffect(() => {
        // Set totals on initial render
        const newData = [...tableData];
        for (let index = 0; index < tableData.length; index++) {
            setTotal(newData, index);
        }
        setTableData(newData);
    }, [tableData]);

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

    const columns = [
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
    const { Option1 } = Select;
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
                size="small"
                summary={pageData => (
                    <Table.Summary fixed  bordered={false}>
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={2} />
                            <Table.Summary.Cell colSpan={2} >
                                Sub Total
                            </Table.Summary.Cell>
                            <Table.Summary.Cell>

                            </Table.Summary.Cell>
                        </Table.Summary.Row >
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={2} />

                            <Table.Summary.Cell  >VAT </Table.Summary.Cell>
                            <Table.Summary.Cell>
                                <Select style={{ width: 100}} bordered={false}>
                                    <Option value="1%">1%</Option>
                                    <Option value="2%">2%</Option>
                                    <Option value="8%">8%</Option>
                                    <Option value="10%">10%</Option>
                                    <Option value="12%">12%</Option>
                                    <Option value="15%">15%</Option>
                                    <Option value="18%">18%</Option>
                                </Select>

                            </Table.Summary.Cell>
                            <Table.Summary.Cell>

                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={2} />
                            <Table.Summary.Cell colSpan={2}>Total </Table.Summary.Cell>
                            <Table.Summary.Cell>

                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />

        </div>
    );
};
