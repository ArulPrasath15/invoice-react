import {Row, Col, Button, Divider, Radio, Input, Form, Select, Space, Image, DatePicker} from 'antd';
import { EditOutlined,SaveOutlined,CloseOutlined,ShopOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title,Text } = Typography;
const { TextArea } = Input;
import Styles from '../../assets/css/General.module.css'
import React, {useState} from "react";
const { Option } = Select;
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import notify from  '../../components/Utils/notify'

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
    console.log("success")
    return isJpgOrPng && isLt2M;
}

export function MyProfile() {

    const [editing, setEditing] = useState(false);
    const [imgUploadLoading, setImgUploadLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
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
                }
            );
        }
    };
    const uploadButton = (
        <div>
            {imgUploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    function ChangeEdit() {setEditing(!editing)}

    const onSubmit = (values)=>{
        console.log(values)
        notify({type:'success',msg:'Updated successfully',des:'General settings updated successfully'})
    }
    return (

        <>
            {!editing && <div>
                <Row justify={"space-between"} align={"middle"}>
                    <Col>
                        <Title level={5} type={'secondary'}>PROFILE </Title>
                    </Col>
                </Row>

                <hr style={{border: "none", borderTop: "1px dotted #4d4d4d", height: "1px", width: "100%"}}/>
                <Space direction={'vertical'}>
                    <div style={{padding: "10px"}}>
                        <Image width={150} height={150}
                               src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                               alt="Picture of the author"/>

                    </div>
                    <Space>
                        <Text className={'text-secondary'}>Email : </Text>
                        <Text className='px-2' strong>Arul Prasath</Text>
                    </Space>
                    <Space>
                        <Text className={'text-secondary'}>First Name : </Text>
                        <Text className='px-2' strong>Arul</Text>
                    </Space>
                    <Space>
                        <Text className={'text-secondary'}>Last Name : </Text>
                        <Text className='px-2' strong>Prasath</Text>
                    </Space>
                    <Space>
                        <Text className={'text-secondary'}>Date of Birth : </Text>
                        <Text className='px-2' strong>15/03/2001</Text>
                    </Space>
                </Space>

                <Row className='mt-5' justify={"center"}>
                    <Button type="primary" icon={<EditOutlined/>} onClick={()=>ChangeEdit()}>Edit</Button>
                </Row>
            </div>}

            { editing && <div>
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
                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imgUrl ? <Image src={imgUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                        </Upload>

                    </div>
                </Space>

                <Row>
                    <Col>
                        <Form.Item label="Email" name="email"
                                   rules={[{required: true, message: 'Please enter valid email '}]}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item label="First Name" name="firstname"
                                   rules={[{required: true, message: 'Please enter First Name '}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item label="Last Name" name="lastname"
                                   rules={[{required: true, message: 'Please enter Last Name '}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item label="Date of Birth" name="phoneNumber"
                                   rules={[{required: true, message: 'Please enter Phone Number '}]}>
                            <Space direction="vertical">
                                <DatePicker  />
                            </Space>
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