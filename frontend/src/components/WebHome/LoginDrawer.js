import React from 'react';
import axios from 'axios';

import {Avatar, Button, Form, Input, Select,} from 'antd';

const {Option} = Select;


class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
            districts: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/districts/')
            .then(res => this.setState({
                districts: res.data,
            }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item className='center'>
                    <Avatar size={80} icon="user"/>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: 'Please input your Phone Number!',
                        }],
                    })(
                        <Input type='text' placeholder='Please Enter Your Phone Number *'/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" placeholder='Please Enter Your Password *'/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('role', {
                        rules: [{required: true, message: 'Please Select Your role *'}],
                    })(
                        <Select
                            placeholder="Select A Role"
                        >
                            <Option value="1">CL</Option>
                            <Option value="2">Agent</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;