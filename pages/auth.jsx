import {useEffect, useState} from 'react'
import styles from '../assets/css/Auth.module.css';
import {Row, Col, Card, Space, Button} from 'antd';
// import logoImg from '../assets/images/logo.png'
import Image from 'next/image'
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Head from 'next/head'
import { useRouter } from 'next/router'
import notify from "../components/Utils/notify";
import {deviceDetect} from "react-device-detect";

function Auth() {
    const [showLogin, setLogin] = useState(true);
    const router = useRouter()

    useEffect(()=>{
        const { authError }=router.query
        if(authError) {notify({type:'error',msg:`${authError}`,des:''})}
    },[router.query])

    return (
        <>
        <Head>
            <title>Pentafox Invoice</title>
            <meta name="vieport" content="initial-scale=1.0, width=device-width" />
        </Head>

            <Row>
                <Col xs={0} lg={12} className={styles.authBgImg}>
                </Col>
                <Col xs={24} lg={12} style={{paddingLeft:"7vw",paddingRight:"7vw"}}>

                    <div className={'mt-3'}>
                        <Space>
//                             <Image src={logoImg} alt="img" width={35} height={35} className={styles.authLogo} />
                            <h1>Pentafox Invoice</h1>
                        </Space>
                    </div>
                    <Row justify="space-around" className='mt-5' >
                        <Col span={6}>
                            <Button danger={showLogin} type="text"  onClick={()=>setLogin(true)}>Login</Button>
                        </Col>
                        <Col span={6}>
                            <Button  danger={!showLogin} type="text" onClick={()=>setLogin(false)}>Signup</Button>
                        </Col>
                    </Row>
                    { showLogin && <Login deviceInfo={deviceDetect()}/>}
                    { !showLogin && <Register deviceInfo={deviceDetect()}/>}
                </Col>
            </Row>

        </>
    )
}

export default Auth;
