import React from 'react';
import ProfileCard from './profile-card';
import {Card, Col, Divider, Icon, Row,} from "antd";
import {Link} from "react-router-dom";

const cardHeadStyle = {backgroundColor: '#99CCFF', border: 1, borderRadius: 5};
const cardStyle = {border: '1px solid #e539'};

export default class IdPaymentInfo extends React.Component {


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
                            <Card hoverable='true' className={'card-panel hoverable'} headStyle={cardHeadStyle}
                                  style={cardStyle} title='Bkash'>
                                <h6>{this.props.cl.bkash}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' className={'card-panel hoverable'} headStyle={cardHeadStyle}
                                  style={cardStyle} title='National ID'>
                                {this.props.cl.nid === null ? 'No NID Uploaded' :
                                    <img className='responsive-img' width='650' height='auto' alt='nid'
                                         src={this.props.cl.nid}/>}
                            </Card>
                        </Row>
                        <Divider/>
                        <Row>
                            <Card hoverable='true' className={'card-panel hoverable'} headStyle={cardHeadStyle}
                                  style={cardStyle} title='Birth ID'>
                                {this.props.cl.nid === null ? 'No BID Uploaded' :
                                    <img className='responsive-img' width='650' height='auto' alt='nid'
                                         src={this.props.cl.bid}/>}
                            </Card>
                        </Row>

                    </Col>
                </Row>
            </div>
        );
    }
}