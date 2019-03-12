import React from 'react';
import axios from 'axios';
import FooterMain from '../../footer/footer-main';
import SiderMain from '../../sidebar/sidebar-agent';
import HeaderMain from '../../header/header-main';
import PersonalInfo from './container/personal-info';
import IdPaymentInfo from './container/id-payment-info';

import {Layout, Tabs} from "antd";
import {connect} from "react-redux";

const TabPane = Tabs.TabPane;

class AgentProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'Community Leader Profile',
            welcome: 'Welcome to Mr X To Your Profile',
            date: new Date().toDateString(),
            campCnt: 10,
            agentCnt: 20,
            cl: [],
        }
    }

    componentDidMount(){
        console.log(this.props.loggedInUser);
        axios.get(`http://127.0.0.1:8000/api/agent/${this.props.loggedInUser.id}/`)
        .then(res => this.setState({
            cl: res.data,
        }))
    }

    render() {
        console.log(this.props.loggedInUser);
        return (
            <div>
                <Layout>
                    <SiderMain/>
                    <Layout style={{marginLeft: 200}}>
                        <HeaderMain data={this.state.title}/>
                        <div style={{
                                margin: '24px 16px 0',
                                overflow: 'initial',
                                backgroundColor: '#fff',
                                padding: 10
                            }}>
                        <Tabs type="card">
                                <TabPane tab="Personal Information" key="1">
                                    <h5>Personal Information</h5>
                                    <PersonalInfo {...this.state}/>
                                </TabPane>
                                <TabPane tab="Identity and Payment Information" key="2">
                                    <h5>Identity and Payment Information</h5>
                                    <IdPaymentInfo {...this.state}/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        loggedInUser: state.users,
    }
}

export default connect(mapStateToProps)(AgentProfile);