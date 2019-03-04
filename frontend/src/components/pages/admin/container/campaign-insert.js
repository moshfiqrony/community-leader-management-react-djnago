import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import {
    Button, Modal, Form, Input,
} from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Campaign Title">
                            {getFieldDecorator('campaignTitle', {
                                rules: [{ required: true, message: 'Please input the title of Campaign!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            let fd = new FormData();
            fd.append('name', values.campaignTitle);

            axios.post('http://127.0.0.1:8000/api/campaign/', fd)
                .then(res => {
                    if ((res.statusText == 'Created')){
                        alert('Saved');
                        this.props.history.push('/admin/campaignlist/');
                    } else{
                        alert('Not Saved');
                        console.log(res);
                    }
                })

            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    reloadData(){
        console.log('i am on')
        axios.get('http://127.0.0.1:8000/api/agent/')
        .then(res => this.setState({
            agents: res.data
        }))
    }

    render() {
        return (
            <div>
                <Button icon='plus' type="primary" onClick={this.showModal}>Add New</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default withRouter(CollectionsPage);