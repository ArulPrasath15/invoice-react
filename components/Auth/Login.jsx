import axios from 'axios';
import {Row, Col, Typography, Space, Button, Form, Input, message} from 'antd';
import { GoogleOutlined ,FacebookOutlined} from '@ant-design/icons';
import {useState} from "react";
const { Title, Text } = Typography;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (values)=>{
        const payload={
            email,password
        }
        console.log(payload);
        const hide=message.loading('Action in progress..', 10);
        axios.post('/auth/login',payload)
            .then(res=>{
                if(res.status===200)
                {
                    console.log(res)
                    console.log(res.data.token);
                    hide();
                    message.success('This is a success message',10);
                }
                else{
                    throw Error(res.data.msg);
                }
            })
            .catch(err=>{
                // message.error(err)
                console.error(err);
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
