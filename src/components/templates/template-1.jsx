import '../../assets/css/template.css'
import {useContext, useState, useEffect, useRef, createContext, Component} from 'react';
import {Table, Input, Button, Popconfirm, Form, DatePicker, Select} from 'antd';
import {Option} from "antd/es/mentions";
import {PlusOutlined} from "@ant-design/icons";
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
                dataIndex: 'Amount',
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
            qty: '0',
            price: '0',
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
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };


        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

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

                        <div className="for">
                            <h2>Invoice For </h2>
                            <p>Micheal Roy<br/>
                                1114 Freedom Lane<br/>
                                Lodi D.F., California, 95240
                            </p>
                            <Select defaultValue="1" style={{ width: 200}} bordered={false} size={"large"}>
                                <Option value="1">Micheal Roy<br/>1114 Freedom Lane<br/>Lodi D.F., California, 95240</Option>
                                <Option value="2">Robert<br/>1114 Freedom Lane<br/>Lodi D.F., California, 95240</Option>
                                <Option value="3">Alice<br/>1114 Freedom Lane<br/>Lodi D.F., California, 95240</Option>

                            </Select>
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
                                <Table  components={components}  bordered dataSource={dataSource} columns={columns}  pagination={{ position: ['none', 'none'] }} bordered={false}/>
                        </div>

                    </div>
                </div>

                <div className="responsive-message"></div>
            </div>
        );
    }
}