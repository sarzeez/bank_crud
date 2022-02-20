import React from 'react'
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import './login.css'

import request from '../../services/api';

const Login = (props) => {

    const { setUser } = props;
    const navigate = useNavigate()

    const onFinish = (values) => {
        request.auth.signin({
            username: values.username,
            password: values.password
        })
            .then(res => {
                request.auth.saveToken(res.data.token)
                navigate('/')
            })
            .catch(err => {
                // console.log(err.response)
            })
    };
    
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-wrapper'>
            <div className='login-container'>
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your username!',
                                },
                            ]}
                            >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                            ]}
                            >
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login