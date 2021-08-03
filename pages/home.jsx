import  {useState} from 'react';
import React from "react"
React.useLayoutEffect = React.useEffect

import Link from 'next/link'
import Image from 'next/image'
import {Layout, Menu, Button, Typography, Col, Row, Select} from 'antd';
import {UserOutlined, LogoutOutlined, BellOutlined, SettingOutlined, MailOutlined, ProjectOutlined, UsergroupAddOutlined,} from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
import logo from '../assets/images/logo.png';
const { Option } = Select;
import Invoice from "./invoice";
import Client from './client'
// import Template1 from "../components/templates/template-1";
const { Header, Sider } = Layout;
const { Title } = Typography;


function Home(){

    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState(1);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    const handleMenuClick = (event) => {
              setPage(parseInt(event.key))
    }
    const pageSelect = () => {
        switch(page) {
            case 1: return <h1 align={"center"} style={{paddingTop:'40vh'}}>No Page Found 1</h1>
            case 2: return <Client />
            case 3: return <Invoice/>
            default: return <h1 align={"center"} style={{paddingTop:'40vh'}}>No Page Found </h1>
        }
    }

    return (
        <>
        <Layout style={{ minHeight: '100vh' }} >
                <Header className="header" style={{backgroundColor:'white',boxShadow:'inset rgb(0 0 0 / 0%) 0px -5px 8px 0px',paddingLeft:'2vh'}}   >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={1} style={{paddingTop:'10px'}}>
                            <Image width={40} height={40} alt="img" src={logo}/>
                        </Col>
                        <Col className="gutter-row" span={5} style={{paddingTop:'10px'}}>
                            <Title style={{color:'#ff0202'}} level={3}>Pentafox Invoice</Title>
                        </Col>
                        <Col className="gutter-row" span={4} offset={7}>
                            <div  ><Search placeholder="Search Client" allowClear style={{ width: 250, marginTop:'16px' }} /></div>
                        </Col>
                        <Col className="gutter-row"  offset = {1} span={2}>
                            <div >
                                <Select defaultValue="Vspace" style={{ width: 120 }} >
                                <Option value="Vspace">Vspace</Option>
                                <Option value="Pentafox">Pentafox</Option>
                            </Select>
                            </div>
                        </Col>
                        <Col className="gutter-row" offset = {1} span={1}>
                            <Button type="dashed"  shape="circle" icon={<BellOutlined />} size={"large"} />
                        </Col>
                        <Col className="gutter-row" span={1}>
                            <Button type="dashed"  shape="circle" icon={<SettingOutlined />} size={"large"} />
                        </Col>
                        <Col className="gutter-row" span={1} >
                            <Button  type="danger"  shape="circle" icon={<UserOutlined />} size={"large"} />
                        </Col>
                    </Row>
                </Header>
            <Layout>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}  width={200} className="site-layout-background">
                    <Menu theme='dark' key="sub1"  style={{fontSize:'16px',height: '100%', borderRight: 0 }} defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']} mode="inline" onClick={handleMenuClick}  >
                        <Menu.Item key="1" style={{marginTop:'0px'}}  icon={<ProjectOutlined style={{fontSize:'18px'}} /> } >Dashboard</Menu.Item>
                        <Menu.Item key="2" icon={<UsergroupAddOutlined style={{fontSize:'18px'}} />}>Client</Menu.Item>
                        <Menu.Item key="3" icon={<MailOutlined style={{fontSize:'18px'}} />}>Invoice</Menu.Item>
                        <Menu.Item key="4" icon={<LogoutOutlined style={{fontSize:'18px'}} />}>
                            <Link href='/Auth'>
                            <a>Logout</a>
                           </Link>
                        </Menu.Item>
                    </Menu>
              </Sider>
            <Layout className="site-layout">
                {pageSelect()}
                 {/*<Template1 />*/}
                {/*<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
            </Layout>
          </Layout>
       </Layout>
        </>
    );

}

export default Home;