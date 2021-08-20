/*
* @created: 20/08/2021 - 7:14 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Col, Row, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const PositionDetails = () => {
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Start Date',
            dataIndex: 'sdate',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'End Date',
            dataIndex: 'edate',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Fee Type',
            dataIndex: 'feetype',
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
        },
        {
            title: 'Amount',
            dataIndex: 'amt',
        },
        {
            title: 'Total',
            dataIndex: 'total',
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

    const data = [
        {
            key: '1',
            title: "scratch",
            sdate: "23/06/2001",
            edate: "23/05/2020",
            feetype: 'Fixed',
            fee: 609,
            amt: 666.31,
            total: 353
        },
        {
            key: '2',
            title: "overcome",
            sdate: "23/06/2001",
            edate: "23/05/2020",
            feetype: 'Fixed',
            fee: 609,
            amt: 666.31,
            total: 353
        },
        {
            key: '3',
            title: "staff",
            sdate: "23/06/2001",
            edate: "23/05/2020",
            feetype: 'Fixed',
            fee: 609,
            amt: 666.31,
            total: 353
        },

    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <div className='mt-5 mx-5'>
                <Row justify='center' align="middle" className=' py-2 br-5' layout="vertical" gutter={24}>

                    <Col span={24}>
                        <Table columns={columns} dataSource={data} onChange={onChange} />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PositionDetails;
