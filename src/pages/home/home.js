import React from 'react';
import './home.css'
import 'antd/dist/antd.css';
import {Layout, Menu, Button, Typography, Col, Row, Image, Select} from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    BellOutlined,
    SettingOutlined,
    MailOutlined,
    ProjectOutlined,
    UsergroupAddOutlined,

} from '@ant-design/icons';
import Search from "antd/es/input/Search";
import logo from '../../assets/logo.png';
import Invoice from "../../components/invoice";
import Template1 from "../../components/templates/template-1";
import {Option} from "antd/es/mentions";
const { Header, Sider } = Layout;
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

        const { collapsed } = this.state;
        return (

            <Layout style={{ minHeight: '100vh' }} >
                    <Header className="header" style={{backgroundColor:'white',boxShadow:'inset rgb(0 0 0 / 0%) 0px -5px 8px 0px',paddingLeft:'2vh'}}   >
                        <Row gutter={16}  >
                            <Col className="gutter-row" span={1} style={{ marginTop:'12px'}}>
                                <Image
                                    width={40}
                                    src={logo}
                                />
                            </Col>
                            <Col className="gutter-row" span={4} style={{paddingLeft:'0', marginTop:'12px'}}>
                                <Title style={{color:'#ff0202',paddingLeft:'0vh'}} level={3}>Pentafox Invoice</Title>
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
                            <Col className="gutter-row" span={1} offset = {1}    >
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
                        <Menu theme='dark' key="sub1" icon={<UserOutlined />} title="subnav 1" style={{fontSize:'17px'}}  >
                            <Menu.Item key="1" icon={<ProjectOutlined style={{ fontSize: '18px'}} />} >Dashboard</Menu.Item>
                            <Menu.Item key="2" icon={<UsergroupAddOutlined style={{ fontSize: '18px'}} />}>Client</Menu.Item>
                            <Menu.Item key="3" icon={<MailOutlined style={{ fontSize: '18px'}} />}>Invoice</Menu.Item>
                            <Menu.Item key="4" icon={<LogoutOutlined style={{ fontSize: '18px'}} />}>Logout</Menu.Item>
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