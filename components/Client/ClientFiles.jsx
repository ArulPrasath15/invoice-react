import React from 'react';
import {Button, Card, Col, Row, Space, Typography,Table,Divider} from "antd";
import {MailOutlined, PhoneOutlined, UserOutlined,PlusOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons";
const { Title, Text } = Typography;
function ClientFiles(props) {


    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            email: 'yashsdsd@gmail.com',
            phone: '99098987876',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (record) => (
                // record.id
                <Space size="middle">
                    <EditOutlined style={{color:"#D3C17A"}}/>
                    <DeleteOutlined style={{color:"red"}}/>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row>
                <Col span={24}>
                    <Row justify={'space-between'}>
                        <Col >
                            <Title level={5} strong type={'secondary'}>Client Files</Title>
                        </Col>
                        <Col >
                            <Button type={'primary'} icon={<PlusOutlined />} >Upload File</Button>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Text type={'secondary'}>Invoices will be sent to the following recipeint(s)</Text>
                    {/*<Table  dataSource={dataSource} columns={columns} />*/}
                </Col>
            </Row>
        </>
    );
}

export default ClientFiles;