import React from 'react';
import '../../assets/css/home.css'
import {Layout, Button, Typography, Col, Row, Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Search from "antd/es/input/Search";
const {  Content } = Layout;
const { Title } = Typography;


class Invoice extends React.Component {

    render() {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                filters: [
                    {
                        text: 'Joe',
                        value: 'Joe',
                    },
                    {
                        text: 'Jim',
                        value: 'Jim',
                    },
                    {
                        text: 'Submenu',
                        value: 'Submenu',
                        children: [
                            {
                                text: 'Green',
                                value: 'Green',
                            },
                            {
                                text: 'Black',
                                value: 'Black',
                            },
                        ],
                    },
                ],
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Age',
                dataIndex: 'age',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                filters: [
                    {
                        text: 'London',
                        value: 'London',
                    },
                    {
                        text: 'New York',
                        value: 'New York',
                    },
                ],
                onFilter: (value, record) => record.address.indexOf(value) === 0,
            },
        ];
        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                name: 'Jim Red',
                age: 32,
                address: 'London No. 2 Lake Park',
            },
        ];

        function onChange(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }
        return (
            <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ marginTop: 24,borderRadius: 10}}>
                    <Row justify="space-around" align="middle" >
                        <Col span={8}>< Title level={3} style={{ marginLeft: 14,marginTop:5}}>Invoice</Title></Col>
                        <Col span={3} offset={12} >
                            <Button type="primary" style={{borderRadius:'6px'}} icon={<PlusOutlined />} > Add Invoice</Button>

                        </Col>
                    </Row>
                </div>
                <div  style={{ marginTop: 24}}>
                    <Row justify="space-around" align="middle" >
                        <Col span={7} offset={15} >
                            <Search size="large" placeholder="Search Invoice" enterButton />

                        </Col>
                    </Row>
                </div>

                <div className="site-layout-background" style={{ marginTop: 24}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                </div>
            </Content>
        );
    }
}

export default Invoice;