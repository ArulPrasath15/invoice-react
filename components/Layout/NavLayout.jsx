import {useEffect, useState} from 'react';
import React from "react"
import {signout, useSession,signOut} from "next-auth/client";
import Link from 'next/link'
import Image from 'next/image'
// React.useLayoutEffect = React.useEffect
import {Layout, Menu, Button, Typography, Col, Row, Select , Dropdown , Divider, Input, Space} from 'antd';
import {UserOutlined, LogoutOutlined, BellOutlined, SettingOutlined, CopyOutlined, ProjectOutlined, UsergroupAddOutlined,ClockCircleOutlined, DownOutlined} from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
// import Template1 from "../components/Templates/template-1";
const { Search } = Input;
const { Option } = Select;
const { Header, Sider } = Layout;
const { Title } = Typography;
import Router from 'next/router'



const userMenu = (
    <Menu className='mx-5 mt-5'>
      <Menu.Item key="0"  className='px-5 mt-2' icon={<UserOutlined />}>
        <a href="https://www.antgroup.com">Edit Profile</a>
      </Menu.Item>
      <Menu.Item key="3"  className='px-5 mt-2' icon={<LogoutOutlined/>}>
        <a href="https://www.aliyun.com">Logout</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );
  
  
  function NavLayout({children,pathname}){
    const [session , loading] = useSession()
    const [menuSelected, setMenuSelected] = useState();
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    useEffect(()=>{
        const pathnames =pathname.split('/')
        if(['dashboard'].includes(pathnames[0]))
           setMenuSelected(['1'])
       else if(['invoice'].includes(pathnames[0]))
           setMenuSelected(['2'])
       else if(['client'].includes(pathnames[0]))
           setMenuSelected(['3'])
       else if(['timesheet'].includes(pathnames[0]))
           setMenuSelected(['4'])
       else if(['settings'].includes(pathnames[0]))
           setMenuSelected(['5'])
    },[pathname])

    return (
        <>
        <Layout style={{ minHeight: '100vh' }} >
                <Header className="header" style={{backgroundColor:'white',boxShadow:'inset rgb(0 0 0 / 0%) 0px -5px 8px 0px',paddingLeft:'2vh'}}   >
                    <Row gutter={16}>
                        <Col className="gutter-row " span={1} style={{paddingTop:'10px'}} >
                            <Image width={40} height={40} alt="img" src={logo} className='cursor-pointer' onClick={()=>{Router.push('/dashboard')}}/>
                        </Col>
                        <Col className="gutter-row " span={5} style={{paddingTop:'10px'}}>
                            <Title style={{color:'#ff0202'}} level={3} className='cursor-pointer' onClick={()=>{Router.push('/dashboard')}} >Pentafox Invoice</Title>
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
                            <Button type="dashed"  shape="circle" icon={<SettingOutlined />} size={"large"} onClick={()=>{Router.push('/settings')}} />
                        </Col>
                        <Col className="gutter-row" span={1} >
                            <Dropdown  overlay={userMenu} trigger={['click']} placement='bottomRight'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    
                                    {!session && <Button  type="danger"  shape="circle" icon={<UserOutlined />} size={"large"} />}
                                    {session && <Button  type="danger"  shape="circle"  size={"large"}>{session.user.user.fname[0]}</Button>}
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
            <Layout>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}  width={200} className="site-layout-background">
                  {!loading && <Menu theme='dark' key="sub1" style={{fontSize: '16px', height: '100%', borderRight: 0}}
                         defaultSelectedKeys={['1']}
                         defaultOpenKeys={['sub1']} mode="inline" selectedKeys={menuSelected} onSelect={(e) => {
                      setMenuSelected([`${e.key}`])
                  }}>
                      <Menu.Item key="1" style={{marginTop: '0px'}}
                                 icon={<ProjectOutlined style={{fontSize: '18px'}}/>}><Link
                          href='/dashboard'><a>Dashboard</a></Link></Menu.Item>
                      <Menu.Item key="2" icon={<CopyOutlined style={{fontSize: '18px'}}/>}><Link
                          href='/invoice'><a>Invoice</a></Link></Menu.Item>
                      <Menu.Item key="3" icon={<UsergroupAddOutlined style={{fontSize: '18px'}}/>}><Link href='/client'><a>Client</a></Link></Menu.Item>
                      <Menu.Item key="4" icon={<ClockCircleOutlined style={{fontSize: '18px'}}/>}><Link
                          href='/timesheet'><a>Timesheets</a></Link></Menu.Item>
                      <Menu.Item key="5" style={{borderTop: "1px solid rgb(82 82 82)"}}
                                 icon={<SettingOutlined style={{fontSize: '18px'}}/>}><Link
                          href='/settings'><a>Settings</a></Link></Menu.Item>
                      <Menu.Item key="6" icon={<LogoutOutlined style={{fontSize: '18px'}}/>}
                                 onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Logout</Menu.Item>
                  </Menu>}
              </Sider>
            <Layout className="site-layout">
                {children}
                 {/*<Template   1 />*/}
                {/*<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
            </Layout>
          </Layout>
       </Layout>
        </>
    );

}

export default NavLayout;