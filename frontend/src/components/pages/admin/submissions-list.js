import React from 'react';
import FooterMain from '../../footer/footer-main';
import SiderMain from '../../sidebar/sidebar-admin';
import HeaderMain from '../../header/header-main';
import axios from 'axios';

import {Layout,} from "antd";

class Submissions extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'Campaign List',
            welcome: 'Welcome to Mr X To Your Panel',
            date: new Date().toDateString(),
            campCnt: 10,
            agentCnt: 20,
            submissions: [],
        }
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/datacollectionView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                submissions: res.data,
            }))
    }

    render() {
        return (
            <div>
                <Layout>
                    <SiderMain/>
                    <Layout style={{marginLeft: 200}}>
                        <HeaderMain data={this.state.title}/>
                        <div style={{margin: '24px 16px 0', overflow: 'initial', backgroundColor:'#fff', padding: 10}}>
                            {this.state.submissions.map((submission) => {
                                return(<p key={submission.id}>{submission.dataAmount}{submission.location.date}</p>)
                            })}
                        </div>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Submissions;