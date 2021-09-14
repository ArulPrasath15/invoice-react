import React, {useState} from 'react';
import {Drawer, Button, Tabs, Col, Row, Table} from 'antd';
import {InfoCircleOutlined, CreditCardOutlined, HomeOutlined,LeftOutlined} from "@ant-design/icons";
import { Typography, Space } from 'antd';
const { Text, Link } = Typography;
const {TabPane} = Tabs;

export function InvoiceInfo() {

    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onClose = () => {
        setOpenDrawer(false);
    };
    const dataSource = [
        {
            key: '1',
            particulars: 'Mike',
            price: 32,
        },
        {
            key: '2',
            particulars: 'Mike',
            price: 32,
        },
    ];

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            align: 'center'
        },
        {
            title: 'Particulars',
            dataIndex: 'particulars',
            key: 'particulars',
            align: 'center'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center'
        }
    ];


    return (

        <div>
            <div style={{position: "fixed", top: "50vh", right: "0px", }}>
                <Button style={{ width:"2vw",height:"10vh",paddingRigth:10,borderBottomLeftRadius:'1.5vh',borderTopLeftRadius:'1.5vh'}} icon={<LeftOutlined />}   onClick={showDrawer}/>
            </div>

            <Drawer  title="Invoice Informations" width={500} placement="right" onClose={onClose} visible={openDrawer}>
                <Tabs defaultActiveKey="1">
                    {/*Information Tab*/}
                    <TabPane size="small" tab={<span><InfoCircleOutlined />Information</span>} key="1">
                        <Row gutter={24}>
                            <Col span={24} className={"mt-2"}>
                                <Text className={'text-secondary'}>Invoice type : </Text>
                                <Text className='px-2' strong>Not based on approved tasks </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}> <Text className={'text-secondary'}>Invoice ID : </Text>
                                <Text className='px-2' strong> 2021-09-07-0001 </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}><Text className={'text-secondary'}>Creator : </Text>
                                <Text className='px-2' strong> PentaFox Invoice </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Invoice date : </Text>
                                <Text className='px-2' strong> 07/09/2021 </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Payment deadline : </Text>
                                <Text className='px-2' strong> 30 days </Text>
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
                        <Table size="small"  className={"mt-2"} dataSource={dataSource} columns={columns} align={"center"} pagination={false}  />
                        <Row  className={"mt-2"} justify="end" >
                            <Col>
                                <table className={"mt-2"}>
                                    <tr className={"mt-2"}>
                                        <td align={"right"} style={{paddingRight:"1vw"}}><Text className={'text-secondary' }>Subtotal &nbsp;&nbsp; : </Text></td>
                                        <td align={"right"} ><Text className='px-2' >20,00 UGX  </Text> </td>
                                    </tr>
                                    <tr className={"mt-2"}>
                                        <td align={"right"} style={{paddingRight:"1vw"}}> <Text className={'text-secondary' }>VAT (5,0%) &nbsp;&nbsp; : </Text> </td>
                                        <td align={"right"} ><Text className='px-2' > 1,00 UGX   </Text> </td>
                                    </tr>
                                    <tr className={"mt-2"}>
                                        <td align={"right"} style={{paddingRight:"1vw"}}> <Text  strong>Total &nbsp;&nbsp; : </Text></td>
                                        <td align={"right"} ><Text style={{textAlign:"right"}} className='px-2' strong >21,00 UGX   </Text> </td>
                                    </tr>
                                </table>
                            </Col>
                         </Row>
                    </TabPane>

                    {/*Tab for bank details*/}
                    <TabPane tab={<span><CreditCardOutlined/>Bank Details</span>} key="2">
                        <Row gutter={24}>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Account Holder : </Text>
                                <Text className='px-2' strong>Barry Allen </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}> <Text className={'text-secondary'}>Bank Name : </Text>
                                <Text className='px-2' strong> State bank of India </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}><Text className={'text-secondary'}>Account number : </Text>
                                <Text className='px-2' strong> 398939897463 </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>IFSC : </Text>
                                <Text className='px-2' strong> MINB0005943 </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Country of bank : </Text>
                                <Text className='px-2' strong> India </Text>
                            </Col>
                        </Row>
                    </TabPane>

                    {/*Tab for address*/}
                    <TabPane tab={<span><HomeOutlined/> Address</span>} key="3">

                        <Row gutter={24}>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Street/Number : </Text>
                                <Text className='px-2' strong>5/450,salem road,Namakkal </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}> <Text className={'text-secondary'}>City : </Text>
                                <Text className='px-2' strong> Namakkal </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}><Text className={'text-secondary'}>Zip : </Text>
                                <Text className='px-2' strong> 637001 </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>State : </Text>
                                <Text className='px-2' strong> TamilNadu </Text>
                            </Col>
                            <Col className={"mt-2"} span={24}>
                                <Text className={'text-secondary'}>Country : </Text>
                                <Text className='px-2' strong> India </Text>
                            </Col>
                        </Row>
                    </TabPane>

                </Tabs>
            </Drawer>
        </div>
    );
};