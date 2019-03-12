import React from 'react'
import FooterMain from '../../footer/footer-main'
import SiderMain from '../../sidebar/sidebar-dashboard'
import HeaderMain from '../../header/header-main'
import Content from './container/dashboard'

import {Layout} from "antd";
import {connect} from "react-redux";

class CLDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'Community Leader Dashboard',
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
                        <Content data={this.props.loggedInUser}/>
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

export default connect(mapStateToProps) (CLDashboard);