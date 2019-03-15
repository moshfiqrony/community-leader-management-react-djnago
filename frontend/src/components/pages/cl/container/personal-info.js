import React from 'react';
import ProfileCard from './profile-card';
import {Card, Col, Divider, Modal, Row} from "antd";

const cardHeadStyle = {backgroundColor: '#5542'};
const cardStyle = {border: '1px solid #e539'};

export default class PersonalInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            data: '',
            visible: false,
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleEdit(field, value, id) {
        console.log(field, value, id);
        this.setState({
            visible: true,
            data: value,
            title: field,
        })

    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleChange(e){
        const {name, value} = e.target;
        console.log(e.target);
        this.setState({
            [name]: value,
        })
    }


    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <ProfileCard cl={this.props.cl}/>
                    </Col>
                    <Col span={16}>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Full Name'
                                // eslint-disable-next-line
                                  extra={<a
                                      onClick={() => this.handleEdit('Fullname', `${this.props.cl.name}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                                <h6>{this.props.cl.name}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Gender'
                                // eslint-disable-next-line
                                  extra={<a
                                      onClick={() => this.handleEdit('Gender', `${this.props.cl.gender}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                                <h6>{this.props.cl.gender}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Present Address'
                                // eslint-disable-next-line
                                  extra={<a
                                      onClick={() => this.handleEdit('Present Address', `${this.props.cl.address}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                                <h6>{this.props.cl.address}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Marital Status'
                                // eslint-disable-next-line
                                  extra={<a
                                      onClick={() => this.handleEdit('Marital Status', `${this.props.cl.mar_status}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                                <h6>{this.props.cl.mar_status}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle}
                                  title='Employement Status'
                                // eslint-disable-next-line
                                  extra={<a
                                      onClick={() => this.handleEdit('Fullname', `${this.props.cl.empl_status}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                                <h6>{this.props.cl.empl_status}</h6>
                            </Card>
                        </Row>
                    </Col>
                </Row>

                <Modal
                    title={'Edit'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <input type='text' name={this.state.title} onChange={this.handleChange} value={this.state.data} />
                </Modal>
            </div>
        );
    }
}