import {useState} from 'react'
import Link from 'next/link'
import styles from '../assets/css/Auth.module.css';
import {Row, Col, Card, Space, Button} from 'antd';
import logoImg from '../assets/images/logo.png'
import VectorImg from '../assets/images/authVector.png'
import Image from 'next/image'
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

function Auth() {
    const [showLogin, setLogin] = useState(true);

    return (
        <>
        <Row align="middle" className={styles.authBgImg}>
            <Col span={16} offset={4}>
                <Card bordered={false} className={styles.authCard}>
                    <Row>
                        <Col span={0} lg={12}>
                            <Space>
                                <Image src={logoImg} alt="img" width={35} height={35} className={styles.authLogo} />
                                <h1>Pentafox</h1>
                            </Space>
                            <Image src={VectorImg} alt="img" className={styles.authVectorImg} />
                        </Col>
                        <Col sm={24} lg={12}>
                            <Row justify="space-around">
                                <Col span={6}>
                                    <Button danger={showLogin} type="text"  onClick={()=>setLogin(true)}>Login</Button>
                                </Col>
                                <Col span={6}>
                                    <Button  danger={!showLogin} type="text" onClick={()=>setLogin(false)}>Signup</Button>
                                </Col>
                            </Row>
                            { showLogin && <Login />}
                            { !showLogin && <Register />}
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default Auth;
