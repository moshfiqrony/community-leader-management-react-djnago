import React from 'react';
import axios from 'axios';

import {Button, Form, Modal, Select,} from 'antd';

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

        componentDidMount() {
            axios.get('http://127.0.0.1:8000/api/agent/')
                .then(res => this.setState({
                    agents: res.data,
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
                    title="Create a new collection"
                    okText="Select"
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
                                    {console.log(this.state.agents)}
                                    {this.state.agents.map((agent) => {
                                        if (!agent.asign && agent.active) {
                                            return (<Option key={agent.id}
                                                            value={agent.id}>{agent.name + ' ' + agent.phone}</Option>)
                                        }else {
                                            return(null)
                                        }
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class AddNewAgent extends React.Component {
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

            console.log(values.agent);

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

export default AddNewAgent;