import React from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {Button, Table} from "antd";
import AddNewData from './add-new-data';
import {connect} from "react-redux";


class LocationChecklist extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
            .then(res => this.setState({
                data: res.data,
            }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
                .then(res => this.setState({
                    data: res.data,
                }))
        }
    }

        handleRemove(id) {
        let fd = new FormData();
        fd.append('amount', 0);
        axios.patch(`http://127.0.0.1:8000/api/location/${id}/`, fd)
            .then(res => {
                console.log(res);
                if (res.statusText === 'OK') {
                    this.props.history.push(`/cl/campaignlist/${this.props.match.params.campaignId}`);
                }
            })

    }

    reloadData() {
        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
                .then(res => this.setState({
                    data: res.data,
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
            width: '20%',
        }, {
            title: 'Name',
            dataIndex: 'campgDetails.agentId.name',
            key: 'name',
            width: '20%',
        },{
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: '20%',
        }, {
            title: 'Data Collected',
            dataIndex: 'amount',
            key: 'dataAmount',
            width: '10%',
        },{
            title: 'Action',
            key: 'action',
            className: 'hideforpdf',
            width: '10%',
            render: (text, record) => <Button onClick={() => this.handleRemove(record.id)}
                                              type='danger'>Reset</Button>
        }
        ];
        return (
            <div>
                <AddNewData {...this.props}/>
                <Table rowKey='id' pagination={false} columns={columns} dataSource={this.state.data}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.users,
    }
}

export default connect(mapStateToProps)(withRouter(LocationChecklist));