import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {Button} from 'antd';


class CampaignList extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
        };
    }

    handleClick(id) {
        console.log('campaign clicked', id);
        this.props.history.push('/cl/campaignlist/' + id);

    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/campaign/')
            .then(res => this.setState({
                data: res.data,
            }))
    }

    reloadData() {
        console.log('i am on');
        axios.get('http://127.0.0.1:8000/api/campaign/')
            .then(res => this.setState({
                data: res.data
            }))
    }

    render() {
        return (
            <div>
                <Button className='hoverable' icon='reload' type='primary' onClick={() => this.reloadData()}>Reload</Button>
                <table className="centered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((campaign) => {
                        return (<tr key={campaign.id}>
                            <td>{campaign.id}</td>
                            <td>
                                {/* eslint-disable-next-line */}
                                <a onClick={() => this.handleClick(campaign.id)}>{campaign.name}</a>
                                </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(CampaignList);