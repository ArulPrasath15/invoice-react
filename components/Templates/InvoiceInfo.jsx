import React, {useState} from 'react';
import {Drawer, Button, Tabs, Col, Row, Table} from 'antd';
import {InfoCircleOutlined, CreditCardOutlined, HomeOutlined} from "@ant-design/icons";
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
            title: 'Mike',
            price: 32,
        },
        {
            key: '2',
            title: 'Mike',
            price: 32,
        },
    ];

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
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
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer title="Invoice Information" width={500} placement="right" onClose={onClose} visible={openDrawer}
                    styles={{backgroundColor: "gray"}}>
                <Tabs defaultActiveKey="1">
                    {/*Information Tab*/}
                    <TabPane tab={<span><InfoCircleOutlined />Information</span>} key="1">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Text className={'text-secondary'}>Invoice type : </Text>
                                <Text className='px-2' strong>Not based on approved tasks </Text>
                            </Col>
                            <Col span={24}> <Text className={'text-secondary'}>Invoice ID : </Text>
                                <Text className='px-2' strong> 2021-09-07-0001 </Text>
                            </Col>
                            <Col span={24}><Text className={'text-secondary'}>Creator : </Text>
                                <Text className='px-2' strong> PentaFox Invoice </Text>
                            </Col>
                            <Col span={24}>
                                <Text className={'text-secondary'}>Invoice date : </Text>
                                <Text className='px-2' strong> 07/09/2021 </Text>
                            </Col>
                            <Col span={24}>
                                <Text className={'text-secondary'}>Payment deadline : </Text>
                                <Text className='px-2' strong> 30 days </Text>
                            </Col>
                            <Col span={24} style={{marginTop: "2vh", marginBottom: "2vh"}}>
                                <hr style={{
                                    border: "none",
                                    borderTop: "1px dashed #c9c9c9",
                                    height: "1px",
                                    width: "100%"
                                }}/>
                            </Col>
                        </Row>
                        <Table dataSource={dataSource} columns={columns} align={"center"} pagination={false} bordered />
                        <Row  style={{marginTop:"2vh"}} justify="end" >
                            <Col>
                                <table>
                                    <tr>
                                        <td align={"right"} style={{paddingRight:"2vw"}}><Text className={'text-secondary' }>Subtotal : </Text></td>
                                        <td align={"right"} ><Text className='px-2' >20,00 UGX  </Text> </td>
                                    </tr>
                                    <tr>
                                        <td align={"right"} style={{paddingRight:"2vw"}}> <Text className={'text-secondary' }>VAT (5,0%) : </Text> </td>
                                        <td align={"right"} ><Text className='px-2' > 1,00 UGX   </Text> </td>
                                    </tr>
                                    <tr>
                                        <td align={"right"} style={{paddingRight:"2vw"}}> <Text  strong>Total : </Text></td>
                                        <td align={"right"} ><Text style={{textAlign:"right"}} className='px-2' strong >21,00 UGX   </Text> </td>
                                    </tr>
                                </table>
                            </Col>
                         </Row>
                    </TabPane>

                    {/*Tab for bank details*/}
                    <TabPane tab={<span><CreditCardOutlined/>Bank Details</span>} key="2">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Text className={'text-secondary'}>Account Holder : </Text>
                                <Text className='px-2' strong>Barry Allen </Text>
                            </Col>
                            <Col span={24}> <Text className={'text-secondary'}>Bank Name : </Text>
                                <Text className='px-2' strong> State bank of India </Text>
                            </Col>
                            <Col span={24}><Text className={'text-secondary'}>Account number : </Text>
                                <Text className='px-2' strong> 398939897463 </Text>
                            </Col>
                            <Col span={24}>
                                <Text className={'text-secondary'}>IFSC : </Text>
                                <Text className='px-2' strong> MINB0005943 </Text>
                            </Col>
                            <Col span={24}>
                                <Text className={'text-secondary'}>Country of bank : </Text>
                                <Text className='px-2' strong> India </Text>
                            </Col>
                        </Row>
                    </TabPane>

                    {/*Tab for address*/}
                    <TabPane tab={<span><HomeOutlined/> Address</span>} key="3">

                        <Row gutter={24}>
                            <Col span={24}>
                                <Text className={'text-secondary'}>Street/Number : </Text>
                                <Text className='px-2' strong>5/450,salem road,Namakkal </Text>
                            </Col>
                            <Col span={24}> <Text className={'text-secondary'}>City : </Text>
                                <Text className='px-2' strong> Namakkal </Text>
                            </Col>
                            <Col span={24}><Text className={'text-secondary'}>Zip : </Text>
                                <Text className='px-2' strong> 637001 </Text>
                            </Col>
                            <Col span={24}>
                                <Text className={'text-secondary'}>State : </Text>
                                <Text className='px-2' strong> TamilNadu </Text>
                            </Col><Col span={24}>
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