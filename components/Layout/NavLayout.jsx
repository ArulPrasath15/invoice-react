import {useEffect, useState} from 'react';
import React from "react"
import {signout, useSession,signOut} from "next-auth/client";
import Link from 'next/link'
import Image from 'next/image'
import {Layout, Menu, Button, Typography, Col, Row, Select, Dropdown, Divider, Input, Space, BackTop} from 'antd';
import {UserOutlined, LogoutOutlined, FundProjectionScreenOutlined, BellOutlined, SettingOutlined, CopyOutlined, ProjectOutlined, UsergroupAddOutlined,ClockCircleOutlined, DownOutlined} from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
const { Search } = Input;
const { Option } = Select;
const { Header, Sider } = Layout;
const { Title } = Typography;
import Router from 'next/router'
import AuthRoute from '../../hoc/auth.hoc'
//redux
import {connect} from 'react-redux'
import axios from 'axios';
import {setDefaultBusiness,setBusiness} from '../../store/businessStore'


  function NavLayout({children,pathname,business,default_business,setDefaultBusiness,setBusiness}){
    const [session , loading] = useSession()
    const [menuSelected, setMenuSelected] = useState();
    const [collapsed, setCollapsed] = useState(false);
    const [currentBusiness,setCurrentBusiness] = useState(null);
      const onCollapse = () => {
        setCollapsed(!collapsed);
    };

      const userMenu = (
          <Menu className='mx-5 mt-5'>
              <Menu.Item key="0"  className='px-5 mt-2' icon={<UserOutlined />}>
                  <Link href={'/settings'}>
                      Edit Profile
                  </Link>
              </Menu.Item>
              <Menu.Item key="3"  className='px-5 mt-2' icon={<LogoutOutlined/>}>
                  <a onClick={()=>{logout()}}>Logout</a>
              </Menu.Item>
              <Menu.Divider />
          </Menu>
      );


      const logout = async ()=>{
          await setDefaultBusiness({default:null});
          await setBusiness({business:null});
          await signOut({ callbackUrl: 'http://localhost:3000/' })
      }
    const updateBusiness = async (value)=>{
        if(value!='new'){
            setCurrentBusiness(value)
            const res = await axios.get(`/business/${value}`);
            if(res.data){
                await setDefaultBusiness({default:res.data.business});
                Router.replace('/dashboard');
            }
        }
        else{
            Router.replace('/settings?action=newBusiness');

        }
    }

    useEffect(()=>{
        const pathnames =pathname.split('/')
        if(['dashboard'].includes(pathnames[0]))
           setMenuSelected(['1'])
       else if(['invoice'].includes(pathnames[0]))
           setMenuSelected(['2'])
       else if(['client'].includes(pathnames[0]))
           setMenuSelected(['3'])
       else if(['project'].includes(pathnames[0]))
           setMenuSelected(['4'])
       else if(['settings'].includes(pathnames[0]))
           setMenuSelected(['5'])
    },[pathname])

    return (
        <>
            <BackTop/>
        <Layout style={{ minHeight: '100vh' }} >
                <Header className="header" style={{ maxHeight:'55px',backgroundColor:'white',boxShadow:'inset rgb(0 0 0 / 0%) 0px -5px 8px 0px',paddingLeft:'2vh'}}   >
                    <Row>
                        <Col lg={{span:1}} md={{span:2}} xs={{span:2}}  style={{paddingTop:'10px'}} >
                                    <Image width={35} height={35} alt="img" src={logo} className='cursor-pointer' onClick={()=>{Router.push('/dashboard')}}/>
                        </Col>
                        <Col md={{span:6,offset:0}} xs={{span:16,offset:1}} style={{paddingTop:'14px'}}>
                                    <Title style={{color:'#ff0202'}} level={4} className='cursor-pointer' onClick={()=>{Router.push('/dashboard')}} >Pentafox Invoice</Title>
                        </Col>
                        <Col lg={{span:5 , offset:5}} md={{span:5 , offset:2}} xs={{span:0}} >
                                    <div><Search placeholder="Search..." allowClear style={{ width: "100%", marginTop:'16px' }} /></div>
                        </Col>
                        <Col   md={{span:2,offset:1}} xs={{span:0}} >
                            <div>
                                <Select style={{ width: "100%" }} value={default_business? default_business.business_name : ''}  onChange={updateBusiness}>
                                    { business && business.map(bus=>{
                                       return <Option value={bus._id} key={bus._id}>{bus.business_name}</Option>
                                    })}
                                    <Option style={{color:"#1890ff"}} c value={'new'}>Add Business</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col lg={{span:1,offset:1}} md={{span:1,offset:1}}  xs={{span:0}} >
                            <Button type="dashed"  shape="circle" icon={<BellOutlined />} size={"large"} />
                        </Col>
                        <Col lg={{span:1,offset:0}} md={{span:1,offset:1 }} xs={{span:0}} >
                            <Button type="dashed"  shape="circle" icon={<SettingOutlined />} size={"large"} onClick={()=>{Router.push('/settings')}} />
                        </Col>
                        <Col lg={{span:1,offset:0}} md={{span:1,offset:1}} xs={{span:1,offset:4}}  >
                            <Dropdown  overlay={userMenu} trigger={['click']} placement='bottomRight'>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>

                                    {session && <Button  type="danger"  shape="circle" icon={<UserOutlined />} size={"large"} />}
                                    {/*{session && <Button  type="danger"  shape="circle"  size={"large"}>{session.user.user.fname[0]}</Button>}*/}
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
                      <Menu.Item key="4" icon={<FundProjectionScreenOutlined style={{fontSize: '18px'}}/>}><Link
                          href='/project'><a>Projects</a></Link></Menu.Item>
                      <Menu.Item key="5" style={{borderTop: "1px solid rgb(82 82 82)"}}
                                 icon={<SettingOutlined style={{fontSize: '18px'}}/>}><Link
                          href='/settings'><a>Settings</a></Link></Menu.Item>
                      <Menu.Item key="6" icon={<LogoutOutlined style={{fontSize: '18px'}}/>}
                                 onClick={() => logout()}>Logout</Menu.Item>
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


const mapStateToProps = (state) => ({
    business: state.businessStore.business,
    default_business: state.businessStore.default_business,
})

const mapDispatchToProps = {setDefaultBusiness,setBusiness }

// export default AuthRoute(NavLayout);
export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute(NavLayout));