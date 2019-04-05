import React from 'react';
import SiderMain from '../../sidebar/sidebar-agent';
import FooterMain from '../../footer/footer-main';
import HeaderMain from '../../header/header-main';
import {Layout, Tabs, Tag} from 'antd';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

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
            cmpgDetails: [],
            loc: [],
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
        axios.get(`http://127.0.0.1:8000/api/campaignDetails/?agent__id=${this.props.user.id}&campaignId__id=${this.props.match.params.campaignId}`)
            .then(res => {
                console.log(res.data);
                console.log(this.props.user.id);
                console.log(this.props.match.params.campaignId);
                this.setState({
                    cmpgDetails: res.data
                })
            }).catch(err => {
            alert(err)
        });
        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&campgDetails__agentId__id=${this.props.user.id}`)
            .then(res => this.setState({
                loc: res.data,
            }))
            .catch(err => {
                alert(err);
            })
    }


    handleCLData() {
        if (this.state.cmpgDetails.length > 0) {
            return (
                <div>
                    <Tag style={{backgroundColor: 'green', color: 'white', fontsize: 30}}>You are Selected Under</Tag>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.cmpgDetails[0].clId.name}</td>
                            <td>{this.state.cmpgDetails[0].clId.phone}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

            )
        } else {
            return (<div className='center'>
                <h4>We are sorry to inform you {this.props.user.name}</h4>
                <h4> You are still not selected by any CL for this campaign</h4>
                <h4>If you are new. We encourage you to contact your district CL and do more TUTORIAL TASK with him to learn</h4>
            </div>)
        }

    }

    handleCampaign() {
        if ( this.state.loc.length > 0) {
            return (
                <div>
                    <h4>Your Campaign History</h4>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.loc.map(data => {
                            return (<tr>
                                <td>{data.date}</td>
                                <td>{data.location}</td>
                                <td>{data.amount}</td>
                            </tr>)
                        })}
                        </tbody>
                    </table>

                </div>
            )
        }else if (this.state.cmpgDetails.length > 0){
            return (<h6>Congrats!!!! You Are Selected. Keep Patience. Contact CL for more info</h6>)
        }
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
                            {this.handleCLData()}
                            {this.handleCampaign()}

                        </div>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.users,
    }
}


export default connect(mapStateToProps, null)(withRouter(CampaignDetails));