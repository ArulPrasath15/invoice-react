import React, {useState} from 'react';
import {Drawer, Button, Tabs, Col, Row, Table} from 'antd';
import {InfoCircleOutlined, CreditCardOutlined, HomeOutlined,LeftOutlined} from "@ant-design/icons";
import { Typography, Space } from 'antd';
const { Text, Link } = Typography;
const {TabPane} = Tabs;

export function InvoiceInfo({dataSource,currency,business,subTotal,total,vat,invoice,bank}) {

    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onClose = () => {
        setOpenDrawer(false);
    };

    const columns = [
        {
            title: 'Sr No.',
            dataIndex: 'sr',
            key: 'key',
            width:"15%"

        },
        {
            title: 'Particulars',
            dataIndex: 'desc',
            key: 'particulars',
            align: 'center'
        },
        {
            title: 'Price',
            dataIndex: 'amt',
            key: 'price',
            align: 'center',
            // eslint-disable-next-line react/display-name
            render: (text) => {return (<h4>  {currency}&nbsp;{text}</h4>)}
        }
    ];




    return (

        <div>
            <div style={{position: "fixed", top: "50vh", right: "0px", }}>
                <Button style={{ width:"2vw",height:"10vh",paddingRight:10,borderBottomLeftRadius:'1.5vh',borderTopLeftRadius:'1.5vh'}} icon={<LeftOutlined />}   onClick={showDrawer}/>
            </div>

            <Drawer  title="Invoice Information" width={500} placement="right" onClose={onClose} visible={openDrawer}>
                <Tabs defaultActiveKey="1">
                    {/*Information Tab*/}
                    <TabPane size="small" tab={<span><InfoCircleOutlined />Information</span>} key="1">
                        <Row gutter={24}>
                            <Col span={24} className={"mt-2"}>
                                <Text className={'text-secondary'}>Invoice type : </Text>
                                <Text className='px-2' strong>{business.business_type} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}> <Text className={'text-secondary'}>Invoice ID : </Text>
                                <Text className='px-2' strong> {invoice.no} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}><Text className={'text-secondary'}>Creator : </Text>
                                <Text className='px-2' strong> {business.business_name} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Invoice date : </Text>
                                <Text className='px-2' strong> {invoice.date} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Payment deadline : </Text>
                                <Text className='px-2' strong> {invoice.due} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24} style={{marginTop: "2vh", marginBottom: "2vh"}}>
                                <hr style={{
                                    border: "none",
                                    borderTop: "1px dashed #c9c9c9",
                                    height: "1px",
                                    width: "100%"
                                }}/>
                            </Col>
                        </Row>
                        <Table size="small" rowKey="sr" className={"mt-2"} dataSource={dataSource} columns={columns} align={"center"} pagination={false}  />
                        <Row  className={"mt-2"} justify="end" >
                            <Col>
                                <table >
                                    <tbody>
                                    <tr className={"mt-2"}>
                                        <td align={"right"} style={{paddingRight:"1vw"}}><Text className={'text-secondary' }>Subtotal &nbsp;&nbsp; : </Text></td>
                                        <td align={"right"} ><Text className='px-2' >{currency}&nbsp;{subTotal}  </Text> </td>
                                    </tr>
                                    <tr className={"mt-2"}>
                                        <td align={"right"} style={{paddingRight:"1vw"}}> <Text className={'text-secondary' }>VAT ({vat.gst}%) &nbsp;&nbsp; : </Text> </td>
                                        <td align={"right"} ><Text className='px-2' > {currency}&nbsp; {vat.amt}   </Text> </td>
                                    </tr>
                                    <tr className={"mt-2"}>
                                        <td align={"right"} style={{paddingRight:"1vw"}}> <Text  strong>Total &nbsp;&nbsp; : </Text></td>
                                        <td align={"right"} ><Text style={{textAlign:"right"}} className='px-2' strong >{currency}&nbsp;{total}   </Text> </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Col>
                         </Row>
                    </TabPane>

                    {/*Tab for bank details*/}
                    <TabPane tab={<span><CreditCardOutlined/>Bank Details</span>} key="2">
                        <Row gutter={24}>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Account Holder : </Text>
                                <Text className='px-2' strong>{bank.acc_holdername} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}> <Text className={'text-secondary'}>Bank Name : </Text>
                                <Text className='px-2' strong> {bank.bank_name} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}><Text className={'text-secondary'}>Account number : </Text>
                                <Text className='px-2' strong> {bank.acc_number} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>IFSC : </Text>
                                <Text className='px-2' strong> {bank.ifsc} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}> Bank Branch : </Text>
                                <Text className='px-2' strong>{bank.branch}</Text>
                            </Col>
                        </Row>
                    </TabPane>

                    {/*Tab for address*/}
                    <TabPane tab={<span><HomeOutlined/> Address</span>} key="3">

                        <Row gutter={24}>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Street/Number : </Text>
                                <Text className='px-2' strong>{business.address} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}> <Text className={'text-secondary'}>City : </Text>
                                <Text className='px-2' strong> {business.city} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}><Text className={'text-secondary'}>Zip : </Text>
                                <Text className='px-2' strong> {business.pincode} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>State : </Text>
                                <Text className='px-2' strong> {business.state} </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Country : </Text>
                                <Text className='px-2' strong> {business.country} </Text>
                            </Col>
                        </Row>
                    </TabPane>

                </Tabs>
            </Drawer>
        </div>
    );
};
