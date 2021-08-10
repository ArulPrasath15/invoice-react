import { useEffect,useState } from 'react';
import {Row, Col, Typography, Space, Button, Form, Input, message} from 'antd';
import { signIn,useSession } from "next-auth/client"
const { Title, Text } = Typography;
import {connect} from 'react-redux'
import {login} from '../../store/authStore'
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import { useRouter } from 'next/router'

function Login({auth,token,login}) {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ session, loading ] = useSession()

    const onSubmit = (values)=>{
        const payload={
            email,password
        }
        const res=signIn("email-pass",{ callbackUrl: 'http://localhost:3000/dashboard' }, payload);
        console.log("Result"+res);

    }
    const onGoogle = (values)=>{
        const res=signIn("google",{ callbackUrl: 'http://localhost:3000/dashboard' });
        console.log("Result"+res);

    }

    const onFacebook = ()=>{
      const res=signIn("facebook",{ callbackUrl: 'https://548b9431d4d9.ngrok.io/dashboard' });
      console.log("Result"+res);
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
              <Col span={10} offset={1}>
                 <center> <GoogleLoginButton style={{height:'6vh',borderRadius:'5vh',fontSize:'16px'}}   onClick={() => onGoogle()}/></center>
              </Col>
              {/* <Col span={8}>
                  <FacebookLoginButton style={{height:'6vh',borderRadius:'5vh',fontSize:'16px'}}   onClick={() => onFacebook()}>
                      <span>Facebook</span>
                  </FacebookLoginButton>
              </Col> */}
          </Row>
  
      </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.authStore.auth,
    token: state.authStore.token
})

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
