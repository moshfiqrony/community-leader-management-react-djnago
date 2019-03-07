import React from 'react';
import ProfileCard from './profile-card';
import {Card, Col, Row, Divider} from "antd";

const cardHeadStyle = {backgroundColor: '#5542'};
const cardStyle = {border: '1px solid #e539'}

export default class PersonalInfo extends React.Component {

    handleEdit(filed, value, id){
       console.log(filed, value, id);
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
                            extra={<a onClick={() => this.handleEdit('Fullname', `${this.props.cl.name}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                                <h6>{this.props.cl.name}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Gender'
                            // eslint-disable-next-line
                            extra={<a onClick={() => this.handleEdit('Gender', `${this.props.cl.gender}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                                <h6>{this.props.cl.gender}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Present Address'
                            // eslint-disable-next-line
                            extra={<a onClick={() => this.handleEdit('Present Address', `${this.props.cl.address}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                            <h6>{this.props.cl.address}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Marital Status'
                            // eslint-disable-next-line
                            extra={<a onClick={() => this.handleEdit('Marital Status', `${this.props.cl.mar_status}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                            <h6>{this.props.cl.mar_status}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Employement Status'
                            // eslint-disable-next-line
                            extra={<a onClick={() => this.handleEdit('Fullname', `${this.props.cl.empl_status}`, `${this.props.cl.id}`)}>Edit</a>}
                            >
                            <h6>{this.props.cl.empl_status}</h6>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}