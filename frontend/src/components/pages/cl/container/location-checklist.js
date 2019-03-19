import React from 'react';
import axios from 'axios';
import {Button, Table} from "antd";
import {withRouter} from "react-router-dom";
import AddNewLocation from './add-new-location';
import {connect} from "react-redux";


class LocationChecklist extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
        }
    }

    componentDidMount() {

        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
            .then(res => {
                this.setState({
                    locations: res.data,
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
                .then(res => {
                    this.setState({
                        locations: res.data,
                    });
                });
        }
    }

    handleRemove(id) {
        axios.delete(`http://127.0.0.1:8000/api/location/${id}/`)
            .then(res => {
                if (res.statusText === 'No Content') {
                    // alert('Agent Removed');
                    this.props.history.push(`/cl/campaignlist/${this.props.match.params.campaignId}`);
                }
            })
            .then(() => this.reloadData())

    }

    reloadData() {
        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
            .then(res => {
                this.setState({
                    locations: res.data,
                });
            });
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
            title: 'Name',
            dataIndex: 'campgDetails.agentId.name',
            key: 'campgDetails',
            width: '25%',
        }, {
            title: 'Phone',
            dataIndex: 'campgDetails.agentId.phone',
            key: 'phone',
            width: '20%',
        }, {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: '20%',
        }, {
            title: 'Action',
            key: 'action',
            className: 'hideforpdf',
            width: '10%',
            render: (text, record) => <Button onClick={() => this.handleRemove(record.id)}
                                              type='danger'>Remove</Button>
        },
        ];
        return (
            <div>

                <AddNewLocation {...this.props}/>
                <Table rowKey='id' pagination={false} columns={columns} dataSource={this.state.locations}/>
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
