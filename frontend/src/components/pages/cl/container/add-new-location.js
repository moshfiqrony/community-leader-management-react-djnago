import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
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
                validAgent: []
            }
        }

        componentDidMount() {
            axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=${this.props.user.id}&&campaignId=${this.props.match.params.campaignId}`)
                .then(res => this.setState({
                    validAgent: res.data,
                }))
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props !== prevProps) {
                axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=${this.props.user.id}&&campaignId=${this.props.match.params.campaignId}`)
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
                                        return (<Option key={agent.id}
                                                        value={agent.id}>{agent.agentId.name} {agent.agentId.phone}</Option>)
                                    })}
                                    {/* <Option key='1' value='1'>Rony1</Option> */}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label='Select Date'>
                            {getFieldDecorator('date', {
                                rules: [{required: true, message: 'Please select date!'}],
                            })(
                                <DatePicker className='browser-default' disabledDate={current => {
                                    return current && current.valueOf() < Date.now();
                                }} placeholder='Please Select Date *'/>
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
            console.log(values);
            let fd = new FormData();
            fd.append('campgDetails', values.agent);
            fd.append('date', values.date.format('YYYY-MM-DD'));
            fd.append('location', values.location);
            axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__id=${values.agent}&&date=${values.date.format('YYYY-MM-DD')}`)
                .then(res => {
                    if (!(res.data.length > 0)) {
                        axios.post('http://127.0.0.1:8000/api/location/', fd)
                            .then(res => {
                                if (res.statusText === 'Created') {
                                    alert('Location Checklist Added');
                                    this.props.history.push(`/cl/campaignlist/${this.props.match.params.campaignId}`);
                                } else {
                                    alert('Problem To Save');
                                }
                            });
                    }else{
                        alert('Agent Is Already Assigned On This Day')
                    }
                })

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

export default connect(mapStateToProps)(withRouter(AddNewLocation));