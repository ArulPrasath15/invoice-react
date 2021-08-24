/*
* @created: 07/08/2021 - 8:50 PM
* @author: Abi
* @description: ----------------
*/
import React from 'react';
import {Table, Col, Row, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";



const TimesheetList = () => {
    const router = useRouter();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            sorter: (a, b) => a.client.length - b.client.length,
        },
        {
            title: 'Value',
            dataIndex: 'value',
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Un Billed',
            dataIndex: 'ub',
            sorter: (a, b) => a.ub - b.ub,
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
            name: 'Brown',
            client: "PKS Solutions",
            value: 12000,
            ub: 0
        },
        {
            key: '2',
            name: 'Jim Green',
            client: "KR Consultancy",
            value: 4200,
            ub: 120
        },
        {
            key: '3',
            name: 'Black',
            client: "MR Constructions",
            value: 120000,
            ub: 1000
        },{
            key: '4',
            name: 'Yellow',
            client: "CTS",
            value: 100000,
            ub: 0
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
                        <Table columns={columns} dataSource={data} onChange={onChange} rowClassName='cursor-pointer'  onRow={(record) => {
                            return {
                                onClick: () => {
                                    console.log(record.key)
                                    router.push('/timesheet/'+record.key);
                                },
                            };
                        }}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default TimesheetList;
