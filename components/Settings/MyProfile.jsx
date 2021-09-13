import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image, DatePicker, Skeleton} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useEffect, useState} from "react";
const { Option } = Select;
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import notify from  '../../components/Utils/notify'
import axios from "axios";
import {getSession} from "next-auth/client";
import Router from "next/router";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export function MyProfile() {

    const [editing, setEditing] = useState(false);
    const [imgUploadLoading, setImgUploadLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setImgUploadLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                    setImgUploadLoading(false)
                    setImgUrl(imageUrl)
                console.log(imageUrl)
                }
            );
        }
    };
    const uploadButton = (<div>{imgUploadLoading ? <LoadingOutlined /> : <PlusOutlined />}<div style={{ marginTop: 8 }}>Upload</div></div>);function ChangeEdit() {setEditing(!editing)}
    const onSubmit = async (values)=>{
        const params={
            'id':userData.id==null?userData._id:userData.id,
            'updates':{
                'imgurl':imgUrl===''?userData.imgurl:imgUrl,
                'fname':values.firstname,
                'lname':values.lastname,
            }
        }
        try{
            const res = await axios.post('/setting/updatemyprofile', params);
            if (res.status===200 && res.data.user_id!=null) {
                setUserData(res.data.user_data)
                notify({type:'success',msg:'Updated successfully',des:'General settings updated successfully'})
                setEditing(false)
                setImgUrl('')
            }
            else {
                // console.log(params)
                // console.log(res.data)
                notify({type:'warning',msg:'Failed ',des:'General settings updation Failed'})
                setEditing(false)
                setImgUrl('')
            }
        }catch(err){
            notify({type:'warning',msg:'Failed ',des:'General settings updation Failed'})
            setEditing(false)
            setImgUrl('')
        }
    }
    useEffect(()=>{
        setLoading(true)
        getSession().then(async (session,loading) => {
            if (session ) {
                // console.log(session.user.user.id)
                try{
                    const res = await axios.get('/auth/getUser/'+session.user.user.id );
                    if (res.status===200) {
                        setUserData(res.data.user)
                        setLoading(false)
                    }
                }catch(err){
                }
            }
        });
    },[])

    return (
        <>
            {loading===true &&
              <Skeleton active />
            }


            {!editing && userData && loading===false &&
            <div style={{paddingBottom:'18px'}} >
                <Row justify={"space-between"} align={"middle"}>
                    <Col>
                        <Title level={5} type={'secondary'}>PROFILE </Title>
                    </Col>
                    <Col>
                        <Button type={'text'} icon={<EditOutlined/>} onClick={()=>ChangeEdit()} />
                    </Col>
                </Row>

                <hr style={{border: "none", borderTop: "1px dotted #4d4d4d", height: "1px", width: "100%"}}/>
                <Space direction={'vertical'}>
                    { userData.imgurl ?
                    <div style={{padding: "6px"}}>
                         <Image width={150} height={150} src={userData.imgurl} alt="Picture of the author"/>
                    </div> :
                    <div style={{width:"9rem", height: "9rem", borderRadius: "50%", background: "#807e7e", fontSize: "3.5rem", color: "#fff", textAlign: "center", lineHeight: "9rem", margin: "2rem 0",}}>
                        {userData.fname[0].toUpperCase()+userData.lname[0].toUpperCase()}
                    </div>
                    }
                    <Space>
                        <Title level={4} type={'secondary'} className='px-2' strong>{userData.fname} {userData.lname}</Title>
                    </Space>
                    <Space>
                        <Text type={'secondary'} className='px-2'>{userData.email}</Text>
                    </Space>
                </Space>
            </div>}

            { editing && userData && <div>
                <Form layout="vertical"
                      name="basic"
                      onFinish={onSubmit}
                >
                <Row justify={"space-between"}>
                    <Col>
                        <Title level={5} type={'secondary'}>PROFILE </Title>
                    </Col>
                </Row>

                <hr style={{border: "none", borderTop: "1px dotted #4d4d4d", height: "1px", width: "100%"}}/>
                <Space direction={'vertical'}>
                    <div style={{padding: "10px"}}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            howUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imgUrl ? <Image src={imgUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                        </Upload>
                    </div>
                </Space>

                <Row>
                    <Col>
                        <Form.Item label="Email" name="email" initialValue={userData.email} >
                            <Input   disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item label="First Name" name="firstname" initialValue={userData.fname} rules={[{required: true, message: 'Please enter First Name '}]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item label="Last Name" name="lastname" initialValue={userData.lname} rules={[{required: true, message: 'Please enter Last Name '}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className='mt-5' justify={"space-between"}>
                    <Col>
                        <Button type="primary" icon={<SaveOutlined/>} htmlType="submit">Save</Button>
                    </Col>
                    <Col>
                        <Button type="dashed" icon={<CloseOutlined/>} onClick={()=>ChangeEdit()} >Cancel</Button>
                    </Col>
                </Row>
                    </Form>
            </div>}
        </>
    );
}