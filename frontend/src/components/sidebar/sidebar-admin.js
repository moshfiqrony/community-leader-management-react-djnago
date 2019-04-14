import React from 'react'
import {Icon, Layout, Menu} from 'antd';
import {Link, withRouter} from "react-router-dom";
import '../style.css'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logout} from "../../actions";
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

                            <span className="nav-text"><Link className='SideBarText' to='/admin/dashboard'><Icon
                                type="dashboard"/>Dashboard</Link></span>
                        </Menu.Item>
                        <Menu.Item key="1">

                            <span className="nav-text"><Link className='SideBarText' to='/admin/campaignlist'> <Icon
                                type="table"/>Campaign List</Link></span>
                        </Menu.Item>
                        <Menu.Item key="2">

                            <span className="nav-text"><Link className='SideBarText' to='/admin/cllist'><Icon
                                type="team"/>CL List</Link></span>
                        </Menu.Item>
                        <Menu.Item key="3">

                            <span className="nav-text"><Link className='SideBarText' to='/admin/agentslist'><Icon
                                type="team"/>Agents List</Link></span>
                        </Menu.Item>
                        <Menu.Item key="4">

                            <span className="nav-text"><Link className='SideBarText' to='/admin/submissions'><Icon
                                type="bar-chart"/>Data Collection</Link></span>
                        </Menu.Item>
                        <Menu.Item key="5">

                            <span className="nav-text"><Link className='SideBarText' to='/admin/submissionsview'><Icon
                                type="bar-chart"/>Submissions</Link></span>
                        </Menu.Item>
                        <Menu.Item key="6">

                            <span className="nav-text"><a onClick={() => this.props.logout(this.props.history)}
                                                          className='SideBarText'><Icon
                                type="logout"/>Logout</a></span>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return (bindActionCreators({logout: logout}, dispatch))
}

export default connect(null, mapDispatchToProps)(withRouter(SiderDashboard));