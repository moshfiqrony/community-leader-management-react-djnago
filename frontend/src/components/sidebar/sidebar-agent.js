import React from 'react'
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom";
import '../style.css'
//constant for SiderDashboard from antd

const {
    Sider,
} = Layout;


//main classes for SiderDashboard

class SiderDashboard extends React.Component {
    render() {
        return (
            <div>
                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0,}}>
                    <div style={{height: '32px', margin: '16px',}}>
                            <img alt='D2 Logo' src='http://getd2.com/img/logo-new.png'/>
                    </div>
                    <Menu theme="dark" mode="inline" selectable={false}>
                        <Menu.Item key="0">
                            <span className="nav-text"><Link className='SideBarText' to='/agent/dashboard'><Icon type="dashboard"/>Dashboard</Link></span>
                    </Menu.Item>
                        <Menu.Item key="1">
                            <span className="nav-text"><Link className='SideBarText' to='/agent/campaignlist'> <Icon type="table"/>Campaign List</Link></span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <span className="nav-text"><Link className='SideBarText' to='/agent/profile'><Icon type="user"/>My Profile</Link></span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <span className="nav-text"><Link className='SideBarText' to='/agent/logout'><Icon type="logout"/>Logout</Link></span>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default SiderDashboard;