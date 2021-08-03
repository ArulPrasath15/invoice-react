import {Row, Col, Typography, Space, Button, Form, Input, Select, message} from 'antd';
import { GoogleOutlined ,FacebookOutlined} from '@ant-design/icons';
import axios from "axios";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
const { Title, Text } = Typography;
const { Option } = Select;

function Register() {
    const [form] = Form.useForm();

    const onSubmit = (payload)=>{
      console.log(payload);
        const hide=message.loading('Please wait...',0);
        axios.post('/auth/register',payload)
            .then(res=>{
                if(res.status===200)
                {
                    console.log(res)
                    console.log(res.data.token);
                    hide();
                    message.success('Register Successful',2);
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
            <Title level={3}> Create Account</Title>
          </Space>
        </Typography>
        <Form form={form} name='login' onFinish={onSubmit}>
          <Row justify="space-between">
            <Col xs={24} lg={11}>
              <Form.Item name="fname" rules={[{ required: true, message: 'Please enter your First Name ' },]}>
                <Input allowClear placeholder="First Name"  />
              </Form.Item>
            </Col>
            <Col xs={24} lg={11}>
              <Form.Item name="lname" rules={[{ required: true, message: 'Please enter your Last Name ' },]}>
                <Input allowClear placeholder="Last Name"  />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col xs={11}>
              <Form.Item name="gender" rules={[{ required: true , message:"Choose your gender" }]}>
                <Select placeholder='Choose'>
                  <Option value="M">Male</Option>
                  <Option value="F">Female</Option>
                  <Option value="O">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={11}>
              <Form.Item name="btype" rules={[{ required: true , message:"Choose your business type"  }]}>
                <Select placeholder='Business Type' className='w-100'>
                    <Option value="Retailer">Retailer</Option>
                    <Option value="Freelancer">Freelancer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>


          <Form.Item name="email" rules={[{ required: true, message: 'Please enter your Email id ' }, { type:'email' , message:"Enter a valid Email id" }]}>
            <Input allowClear placeholder="Email"  />
          </Form.Item>
        
          <Row justify="space-between">
            <Col xs={24} lg={11}>
              <Form.Item name="bname" rules={[{ required: true, message: 'Please enter your Business Name ' },]}>
                <Input allowClear placeholder="Business Name"  />
              </Form.Item>
            </Col>
            <Col xs={24} lg={11}>
              <Form.Item name="mobile" rules={[{ required: true, message: 'Please enter your Mobile Number ' }]}>
                  <Input allowClear placeholder="Mobile"  />
              </Form.Item>
            </Col>
          </Row>


          <Row justify="space-between">
            <Col xs={24} lg={11}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your Password '},
                  { min:8 , message:'Password must have atleast 8 characters'}
                ]}
              >
                <Input.Password placeholder="Password"  />
              </Form.Item>      
            </Col>
            <Col xs={24} lg={11}>
              <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your Password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                <Input.Password placeholder='Confirm Password' />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center">
              <Button className="rounded-btn " shape="round" type="primary" htmlType='submit'>
                  Register
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
    )
}

export default Register
