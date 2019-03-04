import React from "react";

import {Layout} from "antd";

const {
    Header
} = Layout;

export default function (props) {
    return (
        <Header className='center' style={{background: '#fff', padding: 0, height: 'auto'}}>
            <h4>{props.data}</h4>
        </Header>
    )
}