import React from 'react';
import SiderMain from '../../sidebar/sidebar-dashboard';
import FooterMain from '../../footer/footer-main';
import HeaderMain from '../../header/header-main';
import NewAgentChecklist from './container/new-agent-checklist';
import LocationChecklist from './container/location-checklist';
import DataCollectionChecklist from './container/data-collection-checklist';
import Overview from './container/overview';
import {Layout, Tabs} from 'antd';
import axios from 'axios';
import {withRouter} from "react-router-dom";

const TabPane = Tabs.TabPane;


class CampaignDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            welcome: 'Welcome to Mr X To Your Panel',
            date: new Date().toDateString(),
            campCnt: 10,
            agentCnt: 200,
            data: [],
        }
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/campaign/${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                data: res.data
            })).catch(err => {
                console.log(err);
                this.props.history.push('/notFound');
        });
    }

    render() {
        return (
            <div>
                <Layout>
                    <SiderMain/>
                    <Layout style={{marginLeft: 200}}>
                        <HeaderMain data={this.state.data.name}/>
                        <div
                            style={{
                                margin: '24px 16px 0',
                                overflow: 'initial',
                                backgroundColor: '#fff',
                                padding: 10
                            }}
                        >
                            <Tabs onChange={callback} type="card">
                                <TabPane tab="Overview" key="1">
                                    <Overview data={this.state}/>
                                </TabPane>
                                <TabPane tab="New Agent Check List" key="2">
                                    <h5>New Agent Check List for {this.state.data.name}</h5>
                                    <NewAgentChecklist {...this.props}/>
                                </TabPane>
                                <TabPane tab="Location Check List" key="3">
                                    <h5>Location Check List for {this.state.data.name}</h5>
                                    <LocationChecklist {...this.props}/>
                                </TabPane>
                                <TabPane tab='Data Collection Check List' key='4'>
                                    <h5>Location Check List for {this.state.data.name}</h5>
                                    <DataCollectionChecklist {...this.props}/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        )
    }
}


function callback(key) {
    console.log(key);
}

export default withRouter(CampaignDetails);