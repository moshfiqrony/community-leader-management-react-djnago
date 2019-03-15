import React from 'react';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import axios from 'axios';
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
        }

    }

    async componentDidMount() {
        await axios.get('http://192.168.2.170:8001/surveys/506/')
            .then(response => {
                this.setState({
                    kqns: response.data,
                    values: []
                })
            })
    }

    loadSurvey(data) {
        for (let i in data) {
            if (i.toString().includes('group')) {
                const obj = {
                    q: this.state.kqns.questions[i.toString()],
                    a: this.state.kqns.answers[data[i].toString()]== null ? data[i] : this.state.kqns.answers[data[i].toString()],
                };
                this.state.values.push(obj);
            }
        }
    }

    render() {
        if (Object.keys(this.state.kqns).length === 0) {
            return (<h1>Loading...</h1>)
        } else if (Object.keys(this.props.data).length !== 0) {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr key='def'>
                                {new Date(this.props.data.end.toString()+'00')-new Date(this.props.data.start.toString()+'00') > 508728 ? <Tag style={{backgroundColor: 'red', color: 'white'}}>Seems To Be Fraud</Tag> : null}
                            </tr>
                        {
                            this.props.data !== null ? this.loadSurvey(this.props.data) : null
                        }
                        {this.state.values.map(val => {
                            return (<tr>
                                {/*//eslint-disable-next-line*/}
                                <td key={val.q} style={{fontSize: 20 ,color: '#000000', backgroundColor: '#eee'}}>
                                    {val.q}
                                </td>
                                {/*//eslint-disable-next-line*/}
                                <td key={val.a} style={{fontSize: 20 ,color: '#000000'}}>
                                    {val.a}
                                </td>
                            </tr>)
                        })}
                        <tr>
                            {/*//eslint-disable-next-line*/}
                            <td key='loc' style={{fontSize: 20 ,color: '#000000', backgroundColor: '#eee'}}>Location</td>
                            {/*//eslint-disable-next-line*/}
                            <td key='locdata'>
                                <Card
                                    style={{height: 300, width: 300}}
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
                        </tbody>
                    </table>
                </div>
            );
        }else{
             //eslint-disable-next-line
            this.state.values = [];
            return(null)
        }
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAuo1ofpy5OWmaPhd8hkY1yXuHupG83C6w'
})(CampaignDataDetailView);
