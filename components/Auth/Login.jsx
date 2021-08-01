import React from 'react'
import Link from 'next/link'
import { Row, Col ,Typography, Space, Button, Input } from 'antd';
import { GoogleOutlined ,FacebookOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

function Login() {
    return (
      <>
        <Typography className="mt-5">
          <Space direction="vertical">
            <Title level={3}> Hello User</Title>
            <Text type="secondary">
              Welcome to Penta Invoice, Please Login to access
            </Text>
          </Space>
        </Typography>
        <Input placeholder="Email" allowClear className="mt-5 w-100" />
        <Input.Password placeholder="Password" className="mt-3 w-100" />
        <div className="text-center">
            <Link href="/home">
                <Button className="mt-4 rounded-btn " shape="round" type="primary">
                    Login
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
    );
}

export default Login
