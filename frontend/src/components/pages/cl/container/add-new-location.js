import React from 'react';

import {Button, DatePicker, Form, Modal, Select,} from 'antd';
import Input from "antd/lib/input";

const {Option} = Select;


const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {

        constructor() {
            super();
            this.state = {
                agents: [],
            }
        }

        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Add New Location Checklist"
                    okText="Save"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Select Agent">
                            {getFieldDecorator('date-picker', {
                                rules: [{required: true, message: 'Please input the title of Campaign!'}],
                            })(
                                <Select
                                    placeholder="Select a option and change input text above"
                                >
                                    <Option key='1' value='1'>Rony1</Option>
                                    <Option key='2' value='2'>Rony2</Option>
                                    <Option key='3' value='3'>Rony3</Option>
                                    <Option key='4' value='4'>Rony4</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label='Select Date'>
                            {getFieldDecorator('date', {
                                rules: [{required: true, message: 'Please select date!'}],
                            })(
                                <DatePicker className='browser-default' placeholder='Please Select Date *'/>
                            )}
                        </Form.Item>
                        <Form.Item label='Enter Location'>
                            {getFieldDecorator('location', {
                                rules: [{required: true, message: 'Please select location!'}],
                            })(
                                <Input className='browser-default' placeholder='Please Enter Location *'/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class AddNewLocation extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log(values.date.format('YYYY-MM-DD'));

            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button icon='plus' type="primary" onClick={this.showModal}>Add New</Button>
                <CollectionCreateForm
                    {...this.props}
                    agents={this.props.agents}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default AddNewLocation;