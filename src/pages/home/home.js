import React from 'react';
import './home.css'
import 'antd/dist/antd.css';
import {Link } from 'react-router-dom'
import {Layout, Menu, Button, Typography, Col, Row, Dropdown, Image} from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    DownOutlined,
    BellOutlined,
    SettingOutlined,
    MailOutlined,
    ProjectOutlined,
    UsergroupAddOutlined,

} from '@ant-design/icons';
import Search from "antd/es/input/Search";
import profilelogo from '../../assets/profile.png';
import logo from '../../assets/logo.png';
import Invoice from "../../components/invoice";
import Template1 from "../../components/templates/template-1";
const { Header, Footer, Sider } = Layout;
const { Title } = Typography;


class Home extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {

        const menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    1st menu item
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    2nd menu item
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                    3rd menu item
                </Menu.Item>
            </Menu>
        );
        const { collapsed } = this.state;

        function handleButtonClick(e) {
            console.log('click left button', e);

        }
        function handleMenuClick(e) {
            console.log('click', e);

        }

        return (

            <Layout style={{ minHeight: '100vh' }} >
                    <Header className="header" style={{backgroundColor:'white',boxShadow:'inset rgb(0 0 0 / 0%) 0px -5px 8px 0px',paddingLeft:'2vh'}}   >
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <div style={{paddingTop:"2vh"}}>
                                    <Row gutter={16}>
                                        <Col>
                                            <Image
                                                width={40}
                                                src={logo}
                                            />
                                        </Col>
                                        <Col>
                                            <Title style={{color:'#ff0202'}} level={3}>Pentafox Invoice</Title>
                                        </Col>
                                    </Row>
                               </div>
                            </Col>
                            <Col className="gutter-row" span={7}>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <div  ><Search placeholder="Search Client" allowClear style={{ width: 250, marginTop:'16px' }} /></div>
                            </Col>
                            <Col className="gutter-row"  offset = {1} span={2}>
                                <div ><Dropdown overlay={menu} style={{color:'red'}}>
                                    <Button style={{backgroundColor:'red',color:'white',borderRadius:'6px'}} >
                                        Button <DownOutlined />
                                    </Button>
                                </Dropdown></div>
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
                  <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}  width={200} className="site-layout-background">
                    <Menu theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu theme='dark' key="sub1" icon={<UserOutlined />} title="subnav 1" >
                            <Menu.Item key="1" icon={<ProjectOutlined />} >Dashboard</Menu.Item>
                            <Menu.Item key="2" icon={<UsergroupAddOutlined />}>Client</Menu.Item>
                            <Menu.Item key="3" icon={<MailOutlined />}>Invoice</Menu.Item>
                            <Menu.Item key="4" icon={<LogoutOutlined />}>
                               <Link to='/'>Logout</Link> 
                            </Menu.Item>
                        </Menu>

                    </Menu>
                  </Sider>
                <Layout className="site-layout">
                    <Invoice/>
                    {/*<Template1 />*/}
                    {/*<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
                </Layout>

               </Layout>
           </Layout>
        );
    }
}

export default Home;