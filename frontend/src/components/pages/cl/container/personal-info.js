import React from 'react';
import ProfileCard from './profile-card';
import {Link, withRouter} from "react-router-dom";
import axios from 'axios';
import {Card, Col, Divider, Icon, Modal, Row, Select} from "antd";
import {baseurl} from '../../../config'

const Option = Select.Option;

const cardHeadStyle = {backgroundColor: '#99CCFF', border: 1, borderRadius: 5};
const cardStyle = {border: '1px solid #e539'};

class PersonalInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            data: '',
            visible: false,
            type: '',
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleEdit(field, value, id, type) {
        this.setState({
            visible: true,
            data: value,
            title: field,
            type: type,
        });
    }


    handleOk() {
        let fd = new FormData();
        if (this.state.title === 'Marital Status') {
            fd.append('mar_status', this.state.data);
        }
        axios.patch(baseurl + `/api/cl/${'1'}/`, fd)
            .then(res => {
                if (res.statusText === 'OK') {
                    this.props.history.push('/cl/profile');
                    this.setState({
                        visible: false,
                    });
                } else {
                    alert('Problem To Update');
                }
            });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleChange(e) {
        this.setState({
            data: e,
        })
    }

    loadOptions() {
        if (this.state.title === 'Marital Status') {
            return (
                <div>
                    <Select style={{width: 400}} name={'data'} value={this.state.data} onChange={this.handleChange}>
                        <Option value={'Married'}>Married</Option>
                        <Option value={'Unmarried'}>Unmarried</Option>
                        <Option value={'Divorced'}>Divorced</Option>
                    </Select>
                </div>
            )
        }
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
                            <Link to={'/cl/profile/edit'}><h5 className={'card-panel hoverable'} style={{
                                cursor: "pointer",
                                border: '1px',
                                borderRadius: 10,
                                padding: 10,
                                width: 165,
                                backgroundColor: '#4A154B',
                                 color: '#fff'
                            }}><Icon type={'edit'}/>Edit Profile</h5></Link>
                            <Card
                                hoverable='true'
                                className={'card-panel hoverable'}
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Full Name'>
                                <h6>{this.props.cl.name}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                className={'card-panel hoverable'}
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Gender'>
                                <h6>{this.props.cl.gender}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                className={'card-panel hoverable'}
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Present Address'>
                                <h6>{this.props.cl.address}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                className={'card-panel hoverable'}
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Marital Status'>
                                <h6>{this.props.cl.mar_status}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                className={'card-panel hoverable'}
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Employement Status'>
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
                    {this.state.type === 'select' ? this.loadOptions() : <div>
                        <input
                            type={'text'}
                            value={this.state.data}
                        />
                    </div>}
                </Modal>
            </div>
        );
    }
}


export default withRouter(PersonalInfo);