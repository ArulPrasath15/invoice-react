import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Row, Col ,Typography, Space, Button, Input } from 'antd';
import { GoogleOutlined ,FacebookOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;

function Login() {
    const [email , setEmail] = useState({
      value:'',
      err:false,
      msg:'',
      clicked:false
    });
    const [password,setPassword] = useState({
      value:'',
      err:false,
      msg:'',
      clicked:false
    });

    const handleEmail = (e)=>{
      setEmail({value:e.target.value})
    }

    const handlePassword = (e)=>{
      setPassword({value:e.target.value})
    }


    const handleSubmit = ()=>{
      
      let data = {
        email:email.value,
        password:password.value
      }
      console.log(data);
    }
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
        {/* LOGIN FORM */}
        <form>
          <Input 
            value={email.value} 
            onChange={ handleEmail } 
            placeholder="Email" 
            allowClear 
            className="mt-5 w-100"
          />
          { email.err && <Text type='danger'>{email.msg}</Text> }
          <Input.Password 
            value={password.value} 
            onChange={ handlePassword } 
            placeholder="Password" 
            className="mt-3 w-100" 
          />
          { password.err && <Text type='danger'>{password.msg}</Text> }
          <div className="text-center">
              <Button onClick={handleSubmit} className="mt-4 rounded-btn " shape="round" type="primary">
                  Login
              </Button>
          </div>
        </form>
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
