import React from 'react';
import axios from 'axios';
import {connect,} from "react-redux";
import {withRouter} from "react-router-dom";
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
            console.log(this.props.user);
            axios.get(`http://127.0.0.1:8000/api/agent/?active=true&&asign=false&&district=${this.props.user.district}`)
                .then(res => this.setState({
                    agents: res.data,
                }))
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props !== prevProps) {
                axios.get(`http://127.0.0.1:8000/api/agent/?active=true&&asign=false&&district=${this.props.user.district}`)
                    .then(res => this.setState({
                        agents: res.data,
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
                                        } else {
                                            return (null)
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

            let fd = new FormData();
            fd.append('clId', this.props.user.id);
            fd.append('agentId', values.agent);
            fd.append('campaignId', this.props.match.params.campaignId);
            axios.post('http://127.0.0.1:8000/api/addcampaignDetails/', fd)
                .then(res => {
                    if(res.statusText === 'Created'){
                        let fd2 = new FormData();
                        fd2.append('asign', true);
                        axios.patch(`http://127.0.0.1:8000/api/agent/${values.agent}/`, fd2)
                            .then(res => {
                                if(res.statusText === 'OK'){
                                    alert('New Agent Added');
                                    this.props.history.push(`/cl/campaignlist/${this.props.match.params.campaignId}`)
                                }
                            });

                    }else {
                        alert('Problem To Add');
                    }
                });

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
                    user={this.props.user}
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


export default connect(mapStateToProps)(withRouter(AddNewAgent));