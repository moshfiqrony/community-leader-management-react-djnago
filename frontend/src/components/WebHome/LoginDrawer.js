import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {loadUsers} from "../../actions";

import {Avatar, Button, Form, Input, Select,} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
                if(values.role === '1'){
                    axios.get(`http://127.0.0.1:8000/api/cl/?phone=${values.phone}`)
                        .then(res => {
                            if(res.data.length === 0){
                                alert('You Are Not Registered! Please Register');
                            }else {
                                if(res.data[0].password !== values.password){
                                    alert('Incorect Password');
                                }else {
                                    this.props.loadUsers(res.data, 'cl', this.props.history);
                                    // this.props.history.push('/cl');
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }else if(values.role === '2'){
                    axios.get(`http://127.0.0.1:8000/api/agent/?phone=${values.phone}`)
                        .then(res => {
                            if(res.data.length === 0){

                                alert('You Are Not Registered! Please Register');
                            }else {
                                if(res.data[0].password !== values.password){

                                    alert('Incorect Password');
                                }else {
                                    this.props.loadUsers(res.data, 'agent', this.props.history);
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    // this.props.history.push('/cl');
                }
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
                        <Input className='browser-default' type='text' placeholder='Please Enter Your Phone Number *'/>
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
                        <Input className='browser-default' type="password" placeholder='Please Enter Your Password *'/>
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

function mapDispatchToProps(dispatch){
    return(bindActionCreators({loadUsers: loadUsers}, dispatch))
}
export default connect(null, mapDispatchToProps) (withRouter(LoginForm));