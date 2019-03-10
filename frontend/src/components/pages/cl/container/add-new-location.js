import React from 'react';
import axios from 'axios';
import {Button, DatePicker, Form, Modal, Select,} from 'antd';
import Input from "antd/lib/input";

const {Option} = Select;


const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {

        constructor() {
            super();
            this.state = {
                validAgent: []
            }
        }
        
        componentDidMount(){
            axios.get('http://127.0.0.1:8000/api/agent/?district=1')
            .then(res => this.setState({
                validAgent: res.data,
            }))
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
                            {getFieldDecorator('agent', {
                                rules: [{required: true, message: 'Please input the title of Campaign!'}],
                            })(
                                <Select
                                    placeholder="Select a option and change input text above"
                                >
                                    {this.state.validAgent.map(agent => {
                                        if(agent.asign !== true && agent.active !== false){
                                            return(<Option key={agent.id} value={agent.id} >{agent.name} {agent.phone}</Option>);
                                        }else{
                                            return(null);
                                        }
                                    })}
                                    {/* <Option key='1' value='1'>Rony1</Option> */}
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
            console.log(values)

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