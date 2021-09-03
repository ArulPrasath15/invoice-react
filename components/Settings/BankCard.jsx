import {Row, Col, Button, Divider, Select, Popconfirm} from 'antd';
import {EditOutlined, DeleteTwoTone} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
import {Modal,Collapse } from "antd";
const { Panel } = Collapse;


function BankCard({showModal,bank,deleteBank}) {

    return (
        <>
            <Row gutter={24}>
                <Col span={24}>
                    <Text className={'text-secondary'}>Bank Name : </Text>
                    <Text className='px-2' strong>{bank.bank_name}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Account No : </Text>
                    <Text className='px-2' strong>{bank.acc_number}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Account Type : </Text>
                    <Text className='px-2' strong>{bank.acc_type}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>IFSC : </Text>
                    <Text className='px-2' strong>{bank.ifsc}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Branch: </Text>
                    <Text className='px-2' strong>{bank.branch}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Address : </Text>
                    <Text className='px-2' strong>{bank.address}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>City: </Text>
                    <Text className='px-2' strong>{bank.city}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Pincode : </Text>
                    <Text className='px-2' strong>{bank.pincode}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>State : </Text>
                    <Text className='px-2' strong>{bank.state}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Pincode : </Text>
                    <Text className='px-2' strong>{bank.pincode}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Country : </Text>
                    <Text className='px-2' strong>{bank.country}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Micr : </Text>
                    <Text className='px-2' strong>{bank.micr}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Swift : </Text>
                    <Text className='px-2' strong>{bank.swift}</Text>
                </Col>
                <Col span={24}>
                    <Text className={'text-secondary'}>Category : </Text>
                    <Text className='px-2' strong>{bank.category}</Text>
                </Col>

            </Row>
            <Divider className="mt-3 mb-2"/>
            <Row justify="start">
                <Col>
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => showModal(bank)}>Edit</Button>
                </Col>
                <Col style={{marginLeft: '10px'}}>
                    <Popconfirm  title="Are you sure to delete this Bank Account?" onConfirm={()=>deleteBank(bank._id)} okText="Yes" cancelText="No">
                        <Button  type="dashed" danger icon={<DeleteTwoTone twoToneColor="red"/>}>Delete</Button>
                    </Popconfirm>

                </Col>
            </Row>
        </>
    )
}

export default BankCard;