import React,{useState} from 'react'
import { Row, Col, Card , Space, Button } from 'antd';
import logoImg from '../assets/logo.png'
import VectorImg from '../assets/images/authVector.png'
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

function Auth() {
    const [showLogin, setLogin] = useState(true);
    return (
        <Row align="middle" className="bg-img">
            <Col span={16} offset={4}>
                <Card bordered={false} className="auth-card">
                    <Row>
                        <Col span={0} md={12}>
                            <Space>
                                <img src={logoImg} alt="img" className="logo" />
                                <h1>Pentafox</h1>
                            </Space>
                            <img src={VectorImg} alt="img" className="vector" />
                        </Col>
                        <Col sm={24} md={12}>
                            <Row justify="space-around">
                                <Col span={6}>
                                    <Button danger={showLogin}  onClick={()=>setLogin(true)}>Login</Button>
                                </Col>
                                <Col span={6}>
                                    <Button  danger={!showLogin} onClick={()=>setLogin(false)}>Signup</Button>
                                </Col>
                            </Row>
                            { showLogin && <Login />}
                            { !showLogin && <Register />}
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default Auth
