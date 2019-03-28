import React from 'react';
import ProfileCard from './profile-card';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {Card, Col, Divider, Modal, Row, Select} from "antd";
import {baseurl} from '../../../config'

const Option = Select.Option;

const cardHeadStyle = {backgroundColor: '#5542'};
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

    componentDidMount() {
        console.log('i am from pf');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            console.log('i am pf up');
        }
    }

    handleEdit(field, value, id, type) {
        console.log(field, value, id, type);
        this.setState({
            visible: true,
            data: value,
            title: field,
            type: type,
        });
        console.log(this.state.type);
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
                }
            });
        this.setState({
            visible: false,
        });
        console.log(this.props);
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleChange(e) {
        console.log(e);
        this.setState({
            data: e,
        })
    }

    loadOptions() {
        if (this.state.title === 'Marital Status') {
            console.log(this.state.title);
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
                            <Card
                                hoverable='true'
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Full Name'
                                // eslint-disable-next-line
                                extra={<a
                                    onClick={() => this.handleEdit(
                                        'Fullname',
                                        `${this.props.cl.name}`,
                                        `${this.props.cl.id}`
                                    )}>Edit</a>
                                }>
                                <h6>{this.props.cl.name}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Gender'
                                // eslint-disable-next-line
                                extra={<a
                                    onClick={() => this.handleEdit(
                                        'Gender',
                                        `${this.props.cl.gender}`,
                                        `${this.props.cl.id}`
                                    )}>Edit</a>
                                }>
                                <h6>{this.props.cl.gender}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Present Address'
                                // eslint-disable-next-line
                                extra={<a
                                    onClick={() => this.handleEdit(
                                        'Present Address',
                                        `${this.props.cl.address}`,
                                        `${this.props.cl.id}`
                                    )}>Edit</a>
                                }>
                                <h6>{this.props.cl.address}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Marital Status'
                                // eslint-disable-next-line
                                extra={<a
                                    onClick={() => this.handleEdit(
                                        'Marital Status',
                                        `${this.props.cl.mar_status}`,
                                        `${this.props.cl.id}`,
                                        'select'
                                    )}>Edit</a>
                                }>
                                <h6>{this.props.cl.mar_status}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card
                                hoverable='true'
                                headStyle={cardHeadStyle}
                                style={cardStyle}
                                title='Employement Status'
                                // eslint-disable-next-line
                                extra={<a
                                    onClick={() => this.handleEdit(
                                        'Fullname',
                                        `${this.props.cl.empl_status}`,
                                        `${this.props.cl.id}`
                                    )}>Edit</a>
                                }>
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