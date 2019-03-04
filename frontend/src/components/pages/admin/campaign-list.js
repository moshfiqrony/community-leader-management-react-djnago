import React from 'react'
import FooterMain from '../../footer/footer-main'
import SiderMain from '../../sidebar/sidebar-admin'
import HeaderMain from '../../header/header-main'
import CampaignList from './container/campaign-list'

import {Layout,} from "antd";

class CLCampaignList extends React.Component {
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
                        <div style={{margin: '24px 16px 0', overflow: 'initial', backgroundColor:'#fff', padding: 10}}>
                            <CampaignList />
                        </div>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default CLCampaignList;