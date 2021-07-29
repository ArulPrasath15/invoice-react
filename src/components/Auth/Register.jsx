import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col ,Typography, Space, Button, Input, Select } from 'antd';
import { GoogleOutlined ,FacebookOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;
const { Option } = Select;

function Register() {
    return (
        <>
        <Typography className="mt-5">
          <Space direction="vertical">
            <Title level={3}> Create Account</Title>
          </Space>
        </Typography>
        <Row justify="space-between">
          <Col xs={24} md={11}>
            <Input placeholder="First Name" allowClear className="mt-3" />    
          </Col>
          <Col xs={24} md={11}>
            <Input placeholder="Last Name" allowClear className="mt-3" />    
          </Col>
        </Row>
        <Row justify="space-between" >
          <Col xs={24} md={11} className="mt-3">
            <Select defaultValue='Male' className='w-100'>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Col>
          <Col xs={24} md={11} className="mt-3">
            <Select defaultValue='Retailer' className='w-100'>
                <Option value="Retailer">Retailer</Option>
                <Option value="Freelancer">Freelancer</Option>
            </Select>
          </Col>
        </Row>
        <Input placeholder="Company Name" allowClear className="mt-3 w-100" />
        <Input placeholder="Email" allowClear className="mt-3 w-100" />
        <Input.Password placeholder="Password" className="mt-3 w-100" />
        <Input.Password placeholder="Confirm Password" className="mt-3 w-100" />
        <div className="text-center">
          <Link to='/home'>          
            <Button className="mt-4 rounded-btn" shape="round" type="primary">
                Register
            </Button>
          </Link>
        </div>
        <Typography className="text-center mt-5">
          <Text type="secondary"> OR </Text>
        </Typography>
        <Row justify="space-around" className="mt-5 border-top">
          <Col span={6}>
            <Button shape="round" icon={<GoogleOutlined />}>
              Google
            </Button>
          </Col>
          <Col span={6}>
            <Button shape="round" icon={<FacebookOutlined />}>
              Facebook
            </Button>
          </Col>
        </Row>
      </>
    )
}

export default Register
