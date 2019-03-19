import React from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {connect} from "react-redux";


class Overview extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            agents: [],
        }
    }


    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
            .then(res => this.setState({data: res.data}));
        axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=${this.props.user.id}&campaignId=${this.props.match.params.campaignId}`)
            .then(res => this.setState({
                agents: res.data
            }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            axios.get(`http://127.0.0.1:8000/api/locationView/?campgDetails__campaignId__id=${this.props.match.params.campaignId}&&campgDetails__clId__id=${this.props.user.id}`)
                .then(res => this.setState({data: res.data}));

            axios.get(`http://127.0.0.1:8000/api/campaignDetails/?clId=${this.props.user.id}&campaignId=${this.props.match.params.campaignId}`)
                .then(res => this.setState({
                    agents: res.data
                }));
        }
    }

    render() {
        let Amount = 0;
        return (
            <div>
                <h2 className='center'>Welcome to {this.props.data.data.name} Overview</h2>
                <div style={{width: 650, margin: '0 auto'}}>
                    <div style={{width: 200, float: 'left'}}>
                        <Card
                            title="Agents"
                            style={{width: 200, backgroundColor: '#00A65A', border: 1, borderRadius: 10}}
                            headStyle={{backgroundColor: '#008a42',borderBottom: '1px solid #fff', borderRadius: 10, color: '#ffff'}}
                        >
                            <h1 style={{color: '#ffff'}}>{this.state.agents.length}</h1>
                        </Card>
                    </div>
                    <div style={{width: 200, marginLeft: 25, float: 'left'}}>
                        <Card
                            title="Location Checklist"
                            style={{width: 200, backgroundColor: '#0073B6', border: 1, borderRadius: 10}}
                            headStyle={{backgroundColor: '#005e9c',borderBottom: '1px solid #fff', borderRadius: 10, color: '#ffff'}}

                        >
                            <h1 style={{color: '#ffff'}}>{this.state.data.length}</h1>
                        </Card>
                    </div>
                    <div style={{width: 200, float: 'right'}}>
                        <Card
                            title="Submissions"
                            style={{width: 200, backgroundColor: '#DC4B38', border: 1, borderRadius: 10}}
                            headStyle={{backgroundColor: '#ac2200',borderBottom: '1px solid #fff', borderRadius: 10, color: '#ffff'}}
                        >
                            {/*{console.log(this.state.data)}*/}
                            <h1 style={{color: '#ffff'}}>{this.state.data.map(amount => {
                                Amount += amount.amount
                            })}
                                {Amount}
                            </h1>
                        </Card>
                    </div>
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

export default connect(mapStateToProps)(Overview);