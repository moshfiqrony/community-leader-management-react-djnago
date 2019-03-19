import React from 'react';
import FooterMain from '../../footer/footer-main';
import SiderMain from '../../sidebar/sidebar-admin';
import HeaderMain from '../../header/header-main';
import axios from 'axios';

import {Button, Layout, Table,} from "antd";

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
        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                submissions: res.data,
            }))
    }

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '10%',
        },{
            title: 'Name',
            dataIndex: 'campgDetails.clId.name',
            key: 'name',
            width: '15%',
        },{
            title: 'Name',
            dataIndex: 'campgDetails.clId.phone',
            key: 'name',
            width: '15%',
        }, {
            title: 'Name',
            dataIndex: 'campgDetails.agentId.name',
            key: 'name',
            width: '15%',
        },{
            title: 'Name',
            dataIndex: 'campgDetails.agentId.phone',
            key: 'name',
            width: '10%',
        }, {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: '10%',
        }, {
            title: 'Data Collected',
            dataIndex: 'amount',
            key: 'dataAmount',
            width: '5%',
            render: (text, record) => record.amount == 0 ? null : record.amount
        }, {
            title: 'Action',
            key: 'action',
            className: 'hideforpdf',
            width: '5%',
            render: (text, record) => <Button onClick={() => this.handleRemove(record.id)}
                                              type='danger'>Reset</Button>
        }
        ];
        return (
            <div>
                <Layout>
                    <SiderMain/>
                    <Layout style={{marginLeft: 200}}>
                        <HeaderMain data={this.state.title}/>
                        <div style={{margin: '24px 16px 0', overflow: 'initial', backgroundColor:'#fff', padding: 10}}>
                            <Table rowKey='id' pagination={false} columns={columns} dataSource={this.state.submissions}/>
                        </div>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Submissions;