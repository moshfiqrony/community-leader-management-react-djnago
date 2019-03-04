import React from 'react';
import axios from 'axios';
import {Table} from "antd";
import AddNewData from './add-new-data';


class LocationChecklist extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/datacollection/')
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
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: '30%',
        }, {
            title: 'Data Collected',
            dataIndex: 'dataAmount',
            key: 'dataAmount',
            width: '30  %',
        },
        ];
        return (
            <div>
                <AddNewData {...this.props}/>
                <Table rowKey='id' pagination={false} columns={columns} dataSource={this.state.data}/>
            </div>
        )
    }
}

export default LocationChecklist;