import React from 'react';
import axios from 'axios';
import {Table} from "antd";
import AddNewLocation from './add-new-location';


class LocationChecklist extends React.Component{
    constructor(){
        super();
        this.state = {
            locations: [],
        }
    }
    componentDidMount() {
        console.log(this.props)
        axios.get('http://127.0.0.1:8000/api/location/')
            .then(res => this.setState({
                locations: res.data,
            }))
    }

    render(){
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '30%',
        },{
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: '30  %',
        },
        ];
        return(
            <div>
                {console.log(this.state.locations)}
                <AddNewLocation {...this.props}/>
                <Table pagination={false} columns={columns} dataSource={this.state.locations}/>
            </div>
        )
    }
}

export default LocationChecklist;