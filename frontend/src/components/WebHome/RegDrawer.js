import React from 'react';
import axios from 'axios';

import {
    Form, Input, Select, Button, Avatar,
} from 'antd';

const {Option} = Select;


class RegistrationForm extends React.Component {

    constructor(){
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
                const fd = new FormData();
                fd.append('name', values.name);
                fd.append('phone', values.phone);
                fd.append('password', values.password);
                fd.append('district', values.district);
                if(values.role == 1){
                    console.log(values.role);
                    axios.post('http://127.0.0.1:8000/api/cl/', fd)
                        .then(res => {
                            console.log(res);
                            if (res.statusText == 'Created'){
                                alert('Account Created! Please Login')
                            }else {
                                alert('Account Not Created! Try Again')
                            }
                        })
                        .catch(error => {
                            console.log(error.response);
                            if(error.response.status == 400){
                                alert('Phone Number Exist!')
                            }
                        })
                }else if(values.role == 2){
                    console.log(values.role);
                    axios.post('http://127.0.0.1:8000/api/agent/', fd)
                        .then(res => {
                            console.log(res);
                            if (res.statusText == 'Created'){
                                alert('Account Created! Please Login')
                            }else {
                                alert('Account Not Created! Try Again')
                            }
                        })
                        .catch(error => {
                            console.log(error.response);
                            if(error.response.status == 400){
                                alert('Phone Number Exist!')
                            }
                        })

                }
            }else{
                alert('Please Follow All The Instructions');
            }
        });
        this.props.form.resetFields();
    }


    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item className='center'>
                    <Avatar size={80} icon="user"/>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please input your Name!',
                        }],
                    })(
                        <Input type='text' placeholder='Please Enter Your Name *'/>
                    )}
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
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" placeholder='Please Enter Your Confirm Password *' onBlur={this.handleConfirmBlur}/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('district', {
                        rules: [{required: true, message: 'Please Select Your District *'}],
                    })(
                        <Select
                            placeholder="Select A District"
                        >
                            {this.state.districts.map(district=>{
                                return(<Option key={district.id} value={district.id}>{district.name}</Option>);
                            })}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('role', {
                        rules: [{required: true, message: 'Please Select Your Role *'}],
                    })(
                        <Select
                            placeholder="Select A Role"
                        >
                            <Option value="1">CL</Option>
                            <Option value="2">Agent</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item className='center'>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default RegistrationForm;