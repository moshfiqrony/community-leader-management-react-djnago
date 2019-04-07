import React from 'react';
import {Button, Form, Input,} from 'antd';


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
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: true, message: 'Please input your phone',
                            }],
                        })(
                            <Input placeholder='Enter Your Phone Number *' className='browser-default'/>
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

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

export default WrappedRegistrationForm;