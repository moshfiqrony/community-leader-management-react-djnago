import React from 'react';

import { Layout } from 'antd';

const {
  Header
} = Layout;


class HeaderHome extends React.Component{
    render() {
        return (
            <div>
                <Header style={{ background: '#ffd', padding: 0 }}>

                </Header>
            </div>
        );
    }
}

export default HeaderHome;