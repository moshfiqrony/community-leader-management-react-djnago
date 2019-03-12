import React from 'react'
import FooterMain from '../../footer/footer-main'
import SiderMain from '../../sidebar/sidebar-agent'
import HeaderMain from '../../header/header-main'
import Dashboard from './container/dashboard';
import {connect} from "react-redux";

import {Layout,} from "antd";

class AgentDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'Campaign List',
            welcome: 'Welcome to Mr X To Your Panel',
            date: new Date().toDateString(),
            campCnt: 10,
            agentCnt: 20,
        }
    }

    render() {
        return (
            <div>
                <Layout>
                    <SiderMain/>
                    <Layout style={{marginLeft: 200}}>
                        <HeaderMain data={this.state.title}/>
                        <div style={{margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#fff', padding: 10}}>
                            <Dashboard data={this.props.loggedInUser}/>
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

export default connect(mapStateToProps) (AgentDashboard);