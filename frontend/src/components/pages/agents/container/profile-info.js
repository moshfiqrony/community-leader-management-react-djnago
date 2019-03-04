import React from "react";

import {Layout} from "antd";

const {
    Content
} = Layout;

export default function (props) {
    return (
        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div style={{padding: 24, background: '#fff', textAlign: 'center', minHeight: '79vh'}} className='center'>
                <h5>{props.data.welcome}</h5>
                <h6>Today is {new Date().toDateString()}</h6>
            </div>
        </Content>
    )
}