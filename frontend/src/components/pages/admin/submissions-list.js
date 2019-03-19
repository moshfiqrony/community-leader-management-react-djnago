import React from 'react';
import FooterMain from '../../footer/footer-main';
import SiderMain from '../../sidebar/sidebar-admin';
import HeaderMain from '../../header/header-main';
import axios from 'axios';

import {Form, Layout, Select, Table} from "antd";

const {Option} = Select;


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
            dists: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                submissions: res.data,
            }));
        axios.get('http://127.0.0.1:8000/api/districts/')
            .then(res => this.setState({
                dists: res.data,
            }));
    }

    handleChange(district) {
        if(district !== 'all'){
            axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__agentId__district=${district}`)
            .then(res => this.setState({
                submissions: res.data,
            }));
        }else{
            axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                submissions: res.data,
            }));
        }
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
        }, {
            title: 'Cl Name',
            dataIndex: 'campgDetails.clId.name',
            key: 'clname',
            width: '15%',
        }, {
            title: 'CL Phone',
            dataIndex: 'campgDetails.clId.phone',
            key: 'clphone',
            width: '15%',
        }, {
            title: 'Agent Name',
            dataIndex: 'campgDetails.agentId.name',
            key: 'agname',
            width: '15%',
        }, {
            title: 'Agent Phone',
            dataIndex: 'campgDetails.agentId.phone',
            key: 'agphone',
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
        }
        ];
        return (
            <div>
                <Layout>
                    <SiderMain/>
                    <Layout style={{marginLeft: 200}}>
                        <HeaderMain data={this.state.title}/>
                        <div style={{margin: '24px 16px 0', overflow: 'initial', backgroundColor: '#fff', padding: 10}}>
                            <div>
                                <Form style={{width: 300}}>
                                    <Form.Item>
                                        <Select placeholder='Select District' onChange={this.handleChange}>
                                            <Option key={'all'} value={'all'}>All</Option>
                                            {this.state.dists.map(dist => {
                                                return(<Option key={dist.id} value={dist.id}>{dist.name}</Option>)
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Form>
                                <Table rowKey='id' pagination={false} columns={columns}
                                       dataSource={this.state.submissions}/>
                            </div>
                        </div>
                        <FooterMain/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Submissions;