import React from 'react';
import ProfileCard from './profile-card';
import {Card, Col, Row, Divider,} from "antd";

const cardHeadStyle = {backgroundColor: '#5542'};
const cardStyle = {border: '1px solid #e539'}

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
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Bkash'>
                                <h6>{this.props.cl.bkash}</h6>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row align='center'>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='National ID'>
                                <img className='responsive-img'  width='650' height='auto' alt='nid' src={this.props.cl.nid}/>
                            </Card>
                        </Row>
                        <Divider/>
                        <Row align='center'>
                            <Card hoverable='true' headStyle={cardHeadStyle} style={cardStyle} title='Birth ID'>
                                <img className='responsive-img' width='650' height='auto' alt='bid' src={this.props.cl.bid}/>
                            </Card>
                        </Row>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}