import '../../assets/css/template.css'
import {useContext, useState, useEffect, useRef, createContext, Component} from 'react';
import {Table, Input, Button, Popconfirm, Form, DatePicker, Select, InputNumber, Tooltip} from 'antd';
import {Option} from "antd/es/mentions";
import {PlusOutlined} from "@ant-design/icons";
import {ColumnProps} from "antd/es/table";
const EditableContext = createContext(null);


const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({title, editable, children, dataIndex, record, handleSave, ...restProps}) => {

    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {

        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {

        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });

        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{paddingRight: 24,}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

//
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
//
// function createRow(sr,desc, qty, unit) {
//     const price = priceRow(qty, unit);
//     return { sr,desc, qty, unit, price };
// }
//
// function subtotal(items) {
//     return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }
//
// const rows = [
//     createRow(1,'Paperclips (Box)', 100, 1.15),
//     createRow(2,'Paper (Case)', 10, 45.99),
//     createRow(3,'Waste Basket', 2, 17.99),
// ];
//
// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;


export default class Template1 extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Sr No',
                dataIndex: 'sr',
            },
            {
                title: 'Particulars',
                dataIndex: 'desc',
                width: '50%',
                editable: true,
            },
            {
                title: 'Quantity',
                dataIndex: 'qty',
                editable: true,
            },
            {
                title: 'Unit Price',
                dataIndex: 'price',
                editable: true,
            },
            {
                title: 'Amount',
                dataIndex: 'amt',
                render: (_, record) =>{
                    const dataSource = [...this.state.dataSource];
                    dataSource[record.key-1].amt=dataSource[record.key-1].qty*dataSource[record.key-1].price;
                    return dataSource[record.key-1].amt
                }
            },
            // {
            //     title: 'operation',
            //     dataIndex: 'operation',
            //     render: (_, record) =>
            //         this.state.dataSource.length >= 1 ? (
            //             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            //                 <a>Delete</a>
            //             </Popconfirm>
            //         ) : null,
            // },
        ];
        this.state = {
            dataSource: [

            ],
            count: 1,

        };

    }


    // handleDelete = (key) => {
    //     const dataSource = [...this.state.dataSource];
    //     this.setState({
    //         dataSource: dataSource.filter((item) => item.key !== key),
    //     });
    // };

    handleAdd = () => {

        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            sr:count,
            desc: '-',
            qty: 0,
            price: 0,
            amt:0
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });

    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    componentWillMount() {
        this.handleAdd()
    }

    render() {
        // const { dataSource } = this.state;
        // const components = {
        //     body: {
        //         row: EditableRow,
        //         cell: EditableCell,
        //     },
        // };


        // const columns = this.columns.map((col) => {
        //     if (!col.editable) {
        //         return col;
        //     }
        //
        //     return {
        //         ...col,
        //         onCell: (record) => ({
        //             record,
        //             editable: col.editable,
        //             dataIndex: col.dataIndex,
        //             title: col.title,
        //             handleSave: this.handleSave,
        //         }),
        //     };
        // });

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
                                Invoice Date: <DatePicker bordered={false} /><br/>
                                Due Date: <DatePicker bordered={false} />
                            </p>
                        </div>

                        <div className="pdf-body" style={{marginTop:"10%",marginBottom:"5%"}}>
                            <InvoiceTable1 />
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
//
// const InvoiceTable1 = ()=> {
//
//     const [dataSource,setDataSource]=useState([]);
//     const [count,setCount]=useState(0);
//     const components = {
//         body: {
//             row: EditableRow,
//             cell: EditableCell,
//         },
//     };
//     const column = [
//         {
//             title: 'Sr No',
//             dataIndex: 'sr',
//         },
//         {
//             title: 'Particulars',
//             dataIndex: 'desc',
//             width: '50%',
//             editable: true,
//         },
//         {
//             title: 'Quantity',
//             dataIndex: 'qty',
//             editable: true,
//         },
//         {
//             title: 'Unit Price',
//             dataIndex: 'price',
//             editable: true,
//         },
//         {
//             title: 'Amount',
//             dataIndex: 'amt',
//             // render: (_, record) =>{
//             //     const dataSource = [...this.state.dataSource];
//             //     dataSource[record.key-1].amt=dataSource[record.key-1].qty*dataSource[record.key-1].price;
//             //     return dataSource[record.key-1].amt
//             // }
//         },
//     ];
//     const columns = column.map((col) => {
//         if (!col.editable) {
//             return col;
//         }
//
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 editable: col.editable,
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 handleSave: handleSave,
//             }),
//         };
//     });
//
//     const handleAdd = () => {
//
//         const newData = {
//             key: count+1,
//             sr:count+1,
//             desc: '',
//             qty: 0,
//             price: 0,
//             amt:0
//         };
//         setDataSource([...dataSource, newData]);
//         setCount( count + 1);
//     };
//
//     const handleSave = (row) => {
//         const newData = [...dataSource];
//         const index = newData.findIndex((item) => row.key === item.key);
//         const item = newData[index];
//         newData.splice(index, 1, { ...item, ...row });
//         setDataSource(newData);
//
//     };
//     useEffect(()=>{
//
//     if(dataSource.length==0)
//     {
//         handleAdd()
//     }
//     },[dataSource]);
//     return (
//         <div>
//             <Table  components={components}  bordered dataSource={dataSource} columns={columns}  pagination={{ position: ['none', 'none'] }} bordered={false}/>
//         </div>
//     );
// };