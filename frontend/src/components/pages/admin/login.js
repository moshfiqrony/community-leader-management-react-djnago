import React from 'react';
import {Button, Form, Input,} from 'antd';
import axios from 'axios';
import {loadUsers} from '../../../actions/index';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let fd = new FormData();
                axios.get(`http://127.0.0.1:8000/api/useradmin/?username=${values.username}&password=${values.password}`)
                    .then(res => {
                        if(res.statusText === 'OK' && res.data.length === 1){
                            console.log(res.data);
                            this.props.loadUsers(res.data, 'admin', this.props.history);
                        }else {
                            alert('Wrong Credentials Try Again!!');
                        }
                    })
                    .catch(err => alert(err));
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <div className='hoverable' style={{
                width: 500,
                margin: '0 auto',
                border: '1px solid #b5f5ec',
                borderRadius: 10,
                padding: 50,
                marginTop: 50,
            }}>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Item className='center'>
                        <img style={{width: '200px'}} src='/d2logo.png'/>
                    </Form.Item>
                    <Form.Item className='center'>
                        <h4>D2 Admin Login</h4>
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                    >
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true, message: 'Please input Username',
                            }],
                        })(
                            <Input placeholder='Enter Your Username *' className='browser-default'/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password',
                            }],
                        })(
                            <Input placeholder='Enter Your Password *' type='password' className='browser-default'/>
                        )}
                    </Form.Item>
                    <Form.Item className='center'>
                        <Button className='hoverable' type="primary" htmlType="submit">Login</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return(bindActionCreators({loadUsers: loadUsers}, dispatch))
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

export default connect(null, mapDispatchToProps) (withRouter(WrappedRegistrationForm));