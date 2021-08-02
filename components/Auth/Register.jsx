import { Row, Col ,Typography, Space, Button,Form, Input, Select } from 'antd';
import { GoogleOutlined ,FacebookOutlined} from '@ant-design/icons';
import axios from "axios";
const { Title, Text } = Typography;
const { Option } = Select;

function Register() {
    const [form] = Form.useForm();

    const onSubmit = (payload)=>{
      console.log(payload);
      axios.post('/auth/register',payload).then(res=>console.log(res));
    }

    return (
        <>
        <Typography className="mt-5">
          <Space direction="vertical">
            <Title level={3}> Create Account</Title>
          </Space>
        </Typography>
        <Form
           form={form}
          name='login'
          onFinish={onSubmit}
        >
          <Row justify="space-between">
            <Col xs={24} lg={11}>
              <Form.Item
                name="fname"
                rules={[
                  { required: true, message: 'Please enter your First Name ' },
                ]}
              >
                <Input allowClear placeholder="First Name"  />
              </Form.Item>
            </Col>
            <Col xs={24} lg={11}>
              <Form.Item
                name="lname"
                rules={[
                  { required: true, message: 'Please enter your Last Name ' },
                ]}
              >
                <Input allowClear placeholder="Last Name"  />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col xs={11}>
              <Form.Item
                name="gender"
                rules={[{ required: true , message:"Choose your gender" }]}
              >
                <Select placeholder='Choose'>
                  <Option value="M">Male</Option>
                  <Option value="F">Female</Option>
                  <Option value="O">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={11}>
              <Form.Item
                name="btype"
                rules={[{ required: true , message:"Choose your business type"  }]}
              >
                <Select placeholder='Business Type' className='w-100'>
                    <Option value="Retailer">Retailer</Option>
                    <Option value="Freelancer">Freelancer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="bname"
            rules={[
              { required: true, message: 'Please enter your Business Name ' },
            ]}
          >
            <Input allowClear placeholder="Business Name"  />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your Email id ' },
              { type:'email' , message:"Enter a valid Email id" }
            ]}
          >
            <Input allowClear placeholder="Email"  />
          </Form.Item>

            <Form.Item
                name="mobile"
                rules={[
                    { required: true, message: 'Please enter your Mobile Number ' }
                ]}
            >
                <Input allowClear placeholder="Mobile"  />
            </Form.Item>

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

        {/* <Row justify="space-between">
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
        </div> */}
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
