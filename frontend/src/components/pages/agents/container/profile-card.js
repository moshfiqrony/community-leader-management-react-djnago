import React from 'react';
import {Card, Avatar, Tag} from "antd";


export default function(props){
    return(<Card
        className='z-depth-1'
        style={{width: 250, margin: '0 auto'}}>
        <Tag style={{backgroundColor: '#13c2c2', color: 'white'}} className='center'>{props.cl.active ? 'Active': 'Deactive'}</Tag>
        <Tag style={{backgroundColor: '#fcffe6'}} className='center'>{props.cl.asign ? 'Assigned': 'Not Assigned'}</Tag>
        <Avatar className='center-align' size={200} src="http://getd2.com/img/logo-new.png" />
        <h5 className='center'>{props.cl.name}</h5>
        <div>Phone : <Tag style={{backgroundColor: '#d4b106', color: 'white'}} className='center'><p>{props.cl.phone}</p></Tag></div>
        <div>Role : <Tag style={{backgroundColor: '#3f6600', color: 'white'}} className='center'>Agent</Tag></div>
        {/* <div>District : <Tag style={{backgroundColor: '#d46b08', color: 'white'}} className='center'>{props.cl.district? props.cl.district.name : null}</Tag></div> */}
    </Card>)
}
