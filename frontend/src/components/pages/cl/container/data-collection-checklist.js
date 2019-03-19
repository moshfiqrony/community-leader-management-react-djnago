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

    handlePDF(clname) {
        let date = new Date();
        var div = "<html><head><style> .hideforpdf{display: none;}td{text-align:center;}table{border: 1px solid black;float: center;}table tr{border: 1px solid black;}table tr td{border: 1px solid black;}table tr th{border: 1px solid black;}</style></head><body>";
        div += document.getElementById('printArea3').innerHTML;
        div += "</body></html>";
        var win = window.open("", "", "width=960,height=500");
        win.document.write("<center><img src='http://getd2.com/img/logo-new.png'/><h1>Data Collection Check List For : " + this.props.surveyName + "</h1></center><br><br>");
        win.document.write("<center><h4>Community Leader: " + clname + "</h4></center><br><br>");
        win.document.write("<center><h4>Date: " + date + "</h4></center><br><br>");
        win.document.write(div);
        win.document.write("<br><br><center><p>&copy All Rights Reserved By D2</p><p>Developed By D2</p></center>");
        win.print();
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
        }, {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: '20%',
        }, {
            title: 'Data Collected',
            dataIndex: 'amount',
            key: 'dataAmount',
            width: '10%',
            render: (text, record) => record.amount == 0 ? null : record.amount
        }, {
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
                <div style={{paddingBottom: 20, paddingTop: 20}}>
                    <Button icon='reload' type='primary' onClick={() => this.reloadData()}>Reload</Button>
                    <div style={{float: 'right'}}>
                        <Button onClick={() => this.handlePDF(this.props.user.name)}>Download PDF</Button>
                    </div>
                </div>
                <div id='printArea3'>
                    <Table rowKey='id' pagination={false} columns={columns} dataSource={this.state.data}/>
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