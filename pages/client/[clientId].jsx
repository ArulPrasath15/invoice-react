import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import axios from 'axios';
import {connect} from 'react-redux'
import Head from 'next/head';
import  styles from '../../assets/css/Client.module.css';
import {Layout, Button, Typography, Col, Row, Table , Card, Space,Tabs} from 'antd';
import {PlusOutlined , UserOutlined, MailOutlined , PhoneOutlined} from '@ant-design/icons';
const { Title, Text } = Typography;
const { TabPane } = Tabs;

function ClientView(props) {
    const {default_business} = props;
    const Router = useRouter();
    const [client,setClient] = useState(null);
    useEffect(()=>{
        const {clientId} = Router.query;
        (async ()=>{
            try{
                const res = await axios.get(`/client/${default_business._id}/${clientId}`);
                if(res.data.client)
                    setClient(res.data.client);
                else
                    throw Error(res.data.msg);
            }catch (e){
                console.log(e);
            }
        })();
    },[]);
    return(
       <>
           <Head>
               <title>PentaFox | Client</title>
               <meta name="viewport" content="initial-scale=1.0, width=device-width" />
           </Head>
           {client &&
               <div style={{paddingLeft:'10vh',paddingRight:'10vh'}} className={'mt-5'}>
                   <Tabs type="card" size='large'>
                       <TabPane tab="General" key="1">
                           <div className={styles.gen}>
                               <div className="site-card-wrapper">
                                   <Row gutter={40}>
                                       <Col span={30}>
                                           <Card>
                                               <h3> SETTING FOR THIS CLIENT</h3>
                                               <hr/>
                                               <br/>
                                               <Row gutter={20}>
                                                   <Col span={10}>
                                                       <Card style={{width: 300}}>
                                                           <h2>Accounting Profile</h2>
                                                           <p>You banking and tax
                                                               information assigned to this client
                                                           </p>
                                                           <Button type="primary">Create</Button>
                                                       </Card>
                                                   </Col>
                                                   <Col span={10}>
                                                       <Card style={{width: 300}}>
                                                           <h2>Invoicing Profile</h2>
                                                           <p>
                                                               Information you want to print on this Client
                                                           </p>
                                                           <Button type="link">Default Settings</Button>
                                                       </Card>
                                                   </Col>
                                               </Row>
                                               <br/>
                                               <h3>INVOICE RECEIPIENT</h3>
                                               <hr/>
                                               <br/>
                                               <h3>Your Invoices wil be issued to the following Receipient(s)</h3>
                                               <Button className={styles.btn} type="primary" ghost>
                                                   ADD NEW
                                               </Button>

                                               <div className={styles.head}>
                                                   <h3>Full name .</h3>
                                                   <h3>Role</h3>
                                                   <h3>Email</h3>
                                               </div>
                                               <div className={styles.details}>
                                                   <h3>AdamWilson</h3>
                                                   <h3>Nope</h3>
                                                   <h3>adamwilson@gmail.com</h3>
                                               </div>
                                           </Card>

                                       </Col>

                                   </Row>
                               </div>
                           </div>
                       </TabPane>

                       <TabPane tab="Files" key="2">
                           <div className={styles.details}>
                               <Card style={{width: 1200}}>
                                   <p>My Files</p>
                                   <Button className={styles.btn1} type="primary" ghost>
                                       UPLOAD
                                   </Button>

                                   <div>
                                       <h4>Your uploaded files Show here</h4>
                                   </div>
                               </Card>
                           </div>
                       </TabPane>

                   </Tabs>

               </div>
           }
       </>
    );
}

const mapStateToProps = (state) => ({
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = { }


export default connect(mapStateToProps, mapDispatchToProps)(ClientView);