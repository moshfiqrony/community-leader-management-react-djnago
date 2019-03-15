import React from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {Button, DatePicker, Form, Modal, Select,} from 'antd';
import Input from "antd/lib/input";
import {connect} from "react-redux";

const {Option} = Select;


const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component {

        constructor() {
            super();
            this.state = {
                validAgent: [],
                date: '',
                location: 'sd',
            }
        }

        componentDidMount() {
            axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
                .then(res => this.setState({
                    validAgent: res.data,
                }))
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props !== prevProps) {
                axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
                    .then(res => this.setState({
                        validAgent: res.data,
                    }))
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
                    title="Create a new collection"
                    okText="Submit"
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
                                    {this.state.validAgent.map(agent => {
                                        if (agent.amount === 0) {
                                            return (<Option key={agent.id}
                                                            value={agent.id}>{agent.campgDetails.agentId.name} - {agent.campgDetails.agentId.phone} - {agent.date}</Option>)
                                        }
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('amount', {
                                rules: [{required: true, message: 'Please select date!',}],
                            })(
                                <Input type='number'/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class AddNewData extends React.Component {
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

function mapStateToProps(state) {
    return {
        user: state.users,
    }
}

export default connect(mapStateToProps)(withRouter(AddNewData));