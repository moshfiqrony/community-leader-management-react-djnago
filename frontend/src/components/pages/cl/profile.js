import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import FooterMain from '../../footer/footer-main';
import SiderMain from '../../sidebar/sidebar-dashboard';
import HeaderMain from '../../header/header-main';
import PersonalInfo from './container/personal-info';
import IdPaymentInfo from './container/id-payment-info';

import {Layout, Tabs} from "antd";
import {connect} from "react-redux";

const TabPane = Tabs.TabPane;

class CLProfile extends React.Component {
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

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/cldetails/${this.props.loggedInUser.id}/`)
            .then(res => this.setState({
                cl: res.data,
            }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            console.log('i am updating');
            axios.get(`http://127.0.0.1:8000/api/cldetails/${this.props.loggedInUser.id}/`)
                .then(res => this.setState({
                    cl: res.data,
                }));
        }
    }

    render() {
        console.log(this.props);
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
                                    <PersonalInfo {...this.props} {...this.state}/>
                                </TabPane>
                                <TabPane tab="Identity and Payment Information" key="2">
                                    <h5>Identity and Payment Information</h5>
                                    <IdPaymentInfo {...this.props} {...this.state}/>
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
    return {
        loggedInUser: state.users,
    }

}

export default connect(mapStateToProps)(withRouter(CLProfile));