import React from "react";

import {Layout} from "antd";

const {
    Content
} = Layout;

export default function (props) {
    return (
        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div style={{padding: 24, background: '#fff', textAlign: 'center', minHeight: '79vh'}} className='center'>
                <h5>Welcome {props.data.name} to your dashboard</h5>
                <h6>Today is {new Date().toDateString()}</h6>
                <div style={{width: 700, margin: '0 auto', height: 'auto', marginTop: 40}} className='center'>
                    <div className='CountBadge center  pink darken-2'>
                        <h5 className='textColor'>Total Campaign</h5>
                    </div>
                    <div className='CountBadge center  purple'>
                        <h5 className='textColor'>Total Agents</h5>
                    </div>
                </div>
            </div>
        </Content>
    )
}