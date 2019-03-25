import React from 'react';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import data from '../../../../reducers/QNS';
import users from '../../../../reducers/d2-users';
import {Card, Tag} from "antd";

const mapStyles = {
    width: '90%',
    height: '90%',
};

export class CampaignDataDetailView extends React.Component {
    constructor() {
        super();
        this.state = {
            kqns: {},
            values: [],
            users: []
        }

    }

    componentDidMount() {
        this.setState({
            kqns: data,
            users: users,
        })
    }

    loadSurvey(data) {
        for (let i in data) {
            if (i.toString().includes('group')) {
                const obj = {
                    q: this.state.kqns.questions[i.toString()],
                    a: this.state.kqns.answers[data[i].toString()] == null ? data[i].toString().split(' ') : this.state.kqns.answers[data[i].toString()],
                };
                this.state.values.push(obj);
            }
        }
    }

    render() {
        let cnt = 1;
        if (Object.keys(this.state.kqns && this.state.users).length === 0) {
            return (<h1>Loading...</h1>)
        } else if (Object.keys(this.props.data).length !== 0) {
            return (
                <div className='browser-default'>
                    <table className='browser-default'>
                        <tbody className='browser-default'>
                        <tr key='def'>
                            {new Date(this.props.data.end.toString() + '00') - new Date(this.props.data.start.toString() + '00') > 508728 ?
                                <Tag style={{backgroundColor: 'red', color: 'white'}}>Seems To Be Fraud</Tag> : null}
                        </tr>
                        {
                            this.props.data !== null ? this.loadSurvey(this.props.data) : null
                        }
                        {this.state.values.map(val => {
                            return (<tr>
                                {/*//eslint-disable-next-line*/}
                                <td key={val.q} style={{fontSize: 20, color: '#000000',}}>
                                    {cnt++ + '. '} {val.q} –<br/>&emsp;&emsp;
                                    {/*//eslint-disable-next-line*/}
                                    {typeof val.a === "object" ? val.a.map(ans => this.state.kqns.answers[ans] == null ?
                                        <p>&emsp;&emsp;* {ans}</p> :
                                        <p key={ans}>&emsp;&emsp;* {this.state.kqns.answers[ans]}</p>) :
                                        <p>&emsp;&emsp;* {val.a}</p>}
                                </td>
                            </tr>)
                        })}
                        <tr key={this.props.data._geolocation[0]}>
                            {/*//eslint-disable-next-line*/}
                            <td style={{fontSize: 20, color: '#000000',}}>Location
                                <Card
                                    style={{height: 500, width: 625}}
                                >
                                    <Map
                                        google={this.props.google}
                                        zoom={18}
                                        style={mapStyles}
                                        initialCenter={{
                                            lat: this.props.data._geolocation[0],
                                            lng: this.props.data._geolocation[1]
                                        }}
                                        center={{
                                            lat: this.props.data._geolocation[0],
                                            lng: this.props.data._geolocation[1]
                                        }}
                                    >
                                        <Marker
                                            position={{
                                                lat: this.props.data._geolocation[0],
                                                lng: this.props.data._geolocation[1]
                                            }}
                                        />
                                    </Map>
                                </Card>
                            </td>
                        </tr>
                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                <h5>Meta Data Of Submission:</h5>
                            </td>
                        </tr>
                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                Submitted by – <br/>&emsp;&emsp;* {this.state.users.map(user => {
                                if (user.username === this.props.data._submitted_by) {
                                    return (user.first_name + ' ' + user.last_name);
                                }
                            })}
                            </td>
                        </tr>
                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                Submitted In
                                – <br/>&emsp;&emsp;* {(new Date(this.props.data._submission_time + '+0000')).toLocaleString('en-US', {
                                timeZone: 'Asia/Dhaka',
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                            </td>
                        </tr>
                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                Form Name – <br/>&emsp;&emsp;* {this.props.data._xform_id_string}
                            </td>
                        </tr>
                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                Survey Start Time
                                – <br/>&emsp;&emsp;* {(new Date(this.props.data.start + '00')).toLocaleString('en-US', {
                                timeZone: 'Asia/Dhaka',
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                            </td>
                        </tr>
                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                Survey End Time
                                – <br/>&emsp;&emsp;* {(new Date(this.props.data.end + '00')).toLocaleString('en-US', {
                                timeZone: 'Asia/Dhaka',
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                            </td>
                        </tr>

                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                Duration
                                – <br/>&emsp;&emsp;* {((new Date(this.props.data.end + '00').getTime() - new Date(this.props.data.start + '00').getTime()) / 1000 / 60).toFixed(2)} Min
                            </td>
                        </tr>
                        <tr style={{fontSize: 20, color: '#000000',}}>
                            <td>
                                Submission ID – <br/>&emsp;&emsp;* {this.props.data._uuid}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            //eslint-disable-next-line
            this.state.values = [];
            return (null)
        }
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAuo1ofpy5OWmaPhd8hkY1yXuHupG83C6w'
})(CampaignDataDetailView);
