import React from 'react';
import ProfileCard from './profile-card';
import {Link, withRouter} from "react-router-dom";
import {Card, Col, Divider, Icon, Row} from "antd";


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
            </div>
        );
    }
}


export default withRouter(PersonalInfo);