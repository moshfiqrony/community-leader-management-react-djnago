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

    handlePDF(clname) {
        let date = new Date();
        var div = "<html><head><style> .hideforpdf{display: none;}td{text-align:center;}table{border: 1px solid black;float: center;}table tr{border: 1px solid black;}table tr td{border: 1px solid black;}table tr th{border: 1px solid black;}</style></head><body>";
        div += document.getElementById('printArea2').innerHTML;
        div += "</body></html>";
        var win = window.open("", "", "width=960,height=500");
        win.document.write("<center><img src='http://getd2.com/img/logo-new.png'/><h1>Location Check List For : " + this.props.surveyName + "</h1></center><br><br>");
        win.document.write("<center><h4>Community Leader: " + clname + "</h4></center><br><br>");
        win.document.write("<center><h4>Date: " + date + "</h4></center><br><br>");
        win.document.write(div);
        win.document.write("<br><br><center><p>&copy All Rights Reserved By D2</p><p>Developed By D2</p></center>");
        win.print();
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
                <div style={{paddingBottom: 20, paddingTop: 20}}>
                    <Button icon='reload' type='primary' onClick={() => this.reloadData()}>Reload</Button>
                    <div style={{float: 'right'}}>
                        <Button onClick={() => this.handlePDF(this.props.user.name)}>Download PDF</Button>
                    </div>
                </div>
                <div id='printArea2'>
                    <Table rowKey='id' pagination={false} columns={columns} dataSource={this.state.locations}/>
                </div>
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
