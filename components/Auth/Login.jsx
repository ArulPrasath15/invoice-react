import axios from 'axios';
import {Row, Col, Typography, Space, Button, Form, Input, message} from 'antd';
import { GoogleOutlined ,FacebookOutlined} from '@ant-design/icons';
import {useState} from "react";
const { Title, Text } = Typography;
import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (values)=>{
        const payload={
            email,password
        }
        console.log(payload);
        const hide=message.loading('Please wait...',0);
        axios.post('/auth/login',payload)
            .then(res=>{
                if(res.status===200)
                {
                    console.log(res)
                    console.log(res.data.token);
                    hide();
                    message.success('Login Successful',2);
                }
                else{
                    throw Error(res.data.msg);
                }
            })
            .catch(err=>{
                hide();
                if (!err.response) {
                    console.log("Custom Network Error")
                    message.error('Network Error',2);
                } else {
                    message.error(err.message,2)
                }
            });
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
        <Form name='login' onFinish={onSubmit}>
          <Form.Item name="email" rules={[{ required: true, message: 'Please enter your Email id ' }, { type:'email' , message:"Enter a valid Email id" }]}>
            <Input className="mt-5 w-100" allowClear placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your Password !'}, { min:6 , message:'Password must have atleast 8 characters'}]}>
            <Input.Password className=" w-100" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          </Form.Item>
          
          <Form.Item className="text-center">
              <Button className="rounded-btn " shape="round" type="primary" htmlType='submit'>
                  Login
              </Button>
          </Form.Item>
        </Form>
  
        <Typography className="text-center mt-5">
          <Text type="secondary"> OR </Text>
        </Typography>
  
        <Row justify="space-between" className="mt-5 border-top">
          <Col span={8} offset={1}>
              <GoogleLoginButton style={{height:'6vh',borderRadius:'5vh',fontSize:'16px'}}   onClick={() => alert("Hello")}>
                  <span>Google</span>
              </GoogleLoginButton>
          </Col>
          <Col span={8}>
              <FacebookLoginButton style={{height:'6vh',borderRadius:'5vh',fontSize:'16px'}}   onClick={() => alert("Hello")}>
                  <span>Facebook</span>
              </FacebookLoginButton>
          </Col>
        </Row>
  
      </>
    );
}

export default Login
