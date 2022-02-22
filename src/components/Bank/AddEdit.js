import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Alert, Select, message } from 'antd';
import request from '../../services/api';
const { Option } = Select


const AddEdit = (props) => {

    const { setBankModal, setBankInitialValues,  bankInitialValues, onSearch } = props;
    const [error, setError] = useState('')
    const [stateIDOptions, setStateIDOptions] = useState([])
    const [form] = Form.useForm();

    const onFinish = (values) => {
        request.bank.addListItem({
            id: bankInitialValues.id,
            code: values.bank_code,
            bankname: values.bank_name,
            stateid: values.state_id
        })
            .then(res => {
                form.resetFields();
                setBankModal(false)
                onSearch()
                setBankInitialValues({
                    id: '0',
                    bank_code: '',
                    bank_name: '',
                    state_id: 0
                })
            })
            .catch(err => {
                setError(err?.response?.data?.error)
                message.error(err?.response?.data?.error);
                form.resetFields();
            })
    };
    
    const onFinishFailed = (errorInfo) => {
    };

    const onClose = () => {
        setBankModal(false)
        setError('')
        form.resetFields();
        setBankInitialValues({
            id: '0',
            bank_code: '',
            bank_name: '',
            state_id: 0
        })
    }

    useEffect(() => {
        request.bank.getStateList()
            .then(res => {
                const { data } = res;
                setStateIDOptions(data)
            })
            .catch(err => {
                //
            })
    }, [])

    return (
        <div className='add-and-edit'>
            <div className='add-and-edit-inner'>
                <Form
                    name="basic"
                    layout="vertical"
                    form={form}
                    initialValues={bankInitialValues}
                    requiredMark = 'optional'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    
                >
                    <Form.Item
                        label="Bank Code"
                        name="bank_code"
                        rules={[
                            {
                            required: true,
                            message: 'Please input Bank Code!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Bank Name"
                        name="bank_name"
                        rules={[
                            {
                            required: true,
                            message: 'Please input Bank name!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="State ID"
                        name="state_id"
                        rules={[
                            {
                            required: true,
                            message: 'Please input State ID!',
                            },
                        ]}
                        >
                        <Select
                            placeholder="Tanlash"
                            // onChange={this.onGenderChange}
                        >
                            <Option disabled value={0}>Tanlash</Option>
                            {
                                stateIDOptions.map(item => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    {
                        error && 
                        <Alert style={{marginBottom: '20px'}} message={error} type="error" />
                    }
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button style={{marginLeft: '10px'}} onClick={onClose} type="ghost" htmlType="button">
                        Back
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default AddEdit