import React from 'react';
import ProfileCard from './profile-card';
import {Card, Col, Row, Divider} from "antd";

const cardHeadStyle = {backgroundColor: '#5542'};
const cardStyle = {border: '1px solid #e539'}

export default class PersonalInfo extends React.Component {

    handleEdit(){
        console.log('I am from edit Actions');
    }


    render() {
        return (
            <div style={{overflowY: 'scroll', overflowX: 'hidden'}}>
                <Row>
                    <Col span={8}>
                        <ProfileCard cl={this.props.cl}/>
                    </Col>
                    <Col span={16}>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Full Name'>
                                <h6>{this.props.cl.name}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Gender'
                            // eslint-disable-next-line
                            >
                                <h6>{this.props.cl.gender}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Present Address'>
                            <h6>{this.props.cl.address}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Marital Status'>
                            <h6>{this.props.cl.mar_status}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Employement Status'>
                            <h6>{this.props.cl.empl_status}</h6>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}