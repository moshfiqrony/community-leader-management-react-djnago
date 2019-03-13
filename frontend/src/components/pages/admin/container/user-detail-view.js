import React from 'react';
import axios from 'axios';
import {Avatar, Button, Tag} from "antd";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            data: [],
            noData: false,
        }
    }

    getData(URL){
        axios.get(URL)
            .then(res => {
                if(res.statusText === 'OK'){
                    this.setState({
                        data: res.data,
                    });
                }
            });
    }

    componentDidMount() {
        if (this.props.role === 'cl' && this.props.id !== '') {
            console.log('cl', this.props.id);
            this.getData(`http://127.0.0.1:8000/api/cl/${this.props.id}/`);
        } else if (this.props.role === 'agent') {
            console.log('cl', this.props.id);
            this.getData(`http://127.0.0.1:8000/api/agent/${this.props.id}/`);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props && this.props.id !== '') {
            if (this.props.role === 'cl') {
                console.log('cl', this.props.id);
                this.getData(`http://127.0.0.1:8000/api/cl/${this.props.id}/`);
            } else if (this.props.role === 'agent') {
                console.log('agent', this.props.id);
                this.getData(`http://127.0.0.1:8000/api/agent/${this.props.id}/`);
            }
        }
    }

    handlePDFDetilas(name) {
        console.log('i am ohjsdfjh');
        var div = "<html><head><style> img{width: 150px} .hideforpdf{display: none;}</style></head><body><center>";
        div += document.getElementById('printArea2').innerHTML;
        div += "</center></body></html>";
        var win = window.open("", "", "width=960,height=500");
        win.document.write("<center><img src='http://getd2.com/img/logo-new.png'/><h1>"+name+"'s Personal Infromation</h1></center><br><br>");
        win.document.write(div);
        win.document.write("<br><br><center><p>&copy All Rights Reserved By D2</p><p>Developed By D2</p></center>");
        win.print();
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.handlePDFDetilas(this.state.data.name)} className='center'>Print PDF</Button>
                <div id='printArea2'>
                <table>
                    <tbody>
                    <tr>
                        <th>Profile Photo: </th>
                        <td>{this.state.data.profile_pic ? <Avatar className='center-align' size={400} src={this.state.data.profile_pic} /> : 'No Profile Pic Uploded'}</td>

                    </tr>
                    <tr>
                        <th>Name: </th>
                        <td>{this.state.data.name}</td>
                    </tr>
                    <tr>
                        <th>Phone: </th>
                        <td>{this.state.data.phone}{(''+this.state.data.phone).length<11 || (''+this.state.data.phone).length>11 ? <Tag style={{backgroundColor: '#e53935', color: '#fff'}}>Seems To Be Wrong</Tag> : null}</td>
                    </tr>
                    <tr>
                        <th>Address: </th>
                        <td>{this.state.data.address}</td>
                    </tr>
                    <tr>
                        <th>Gender: </th>
                        <td>{this.state.data.gender}</td>
                    </tr>
                    <tr>
                        <th>Marital Status: </th>
                        <td>{this.state.data.mar_status}</td>
                    </tr>
                    <tr>
                        <th>Employement Status: </th>
                        <td>{this.state.data.empl_status}</td>
                    </tr>
                    <tr>
                        <th>Bkash: </th>
                        <td>{this.state.data.bkash}{(''+this.state.data.bkash).length<11 || (''+this.state.data.bkash).length>11 ? <Tag style={{backgroundColor: '#e53935', color: '#fff'}}>Seems To Be Wrong</Tag> : null}</td>
                    </tr>
                    <tr>
                        <th>NID: </th>
                        <td>{this.state.data.nid ? <img width='650' height='auto' alt='bid' src={this.state.data.nid}/> : 'No NID Uploded'}</td>
                    </tr>
                    <tr>
                        <th>Birth ID: </th>
                        <td>{this.state.data.bid ? <img width='650' height='auto' alt='bid' src={this.state.data.bid}/> : 'No BID Uploded'}</td>

                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

export default App;