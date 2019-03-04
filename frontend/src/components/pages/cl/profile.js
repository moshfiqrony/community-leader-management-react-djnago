import React from 'react'
import FooterMain from '../../footer/footer-main'
import SiderMain from '../../sidebar/sidebar-dashboard'
import HeaderMain from '../../header/header-main'
import Content from './container/profile-info'

import {Layout} from "antd";

class CLDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'Community Leader Profile',
            welcome: 'Welcome to Mr X To Your Profile',
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
                        <Content data={this.state}/>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default CLDashboard;