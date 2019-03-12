import React from 'react';
import {connect} from 'react-redux'
import 'antd/dist/antd.css';
import 'materialize-css/dist/css/materialize.min.css';
//webview components
import Home from './components/WebHome/Home'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import About from "./components/WebHome/About";
import Contact from "./components/WebHome/Contact";
//cl components
import CLDashboard from "./components/pages/cl/dashboard";
import CLAgentList from "./components/pages/cl/agents-list";
import CLCampaignList from './components/pages/cl/campaign-list';
import CLProfile from './components/pages/cl/profile';
import CLCampaignDetails from './components/pages/cl/campaign-details';
//admin components
import AdminCampaignList from './components/pages/admin/campaign-list';
import AdminDashboard from './components/pages/admin/dashboard';
import AdminAgentList from './components/pages/admin/agent-list';
import AdminCLList from './components/pages/admin/cl-list';
import AdminSubmission from './components/pages/admin/submissions';
import AdminSubmissionList from './components/pages/admin/submissions-list';
//agents routing
import AgentCampaignList from './components/pages/agents/campaign-list';
import AgentProfile from "./components/pages/agents/profile";
import AgentDashboard from './components/pages/agents/dashboard';
//extra components
import ErrorPage from './components/WebHome/404';
import NotFound from './components/WebHome/not-found';


// main app
class MyApp extends React.Component {
    constructor() {
        super();
        this.state={
            isLogin: true,
        }
    }


    render() {
        console.log(this.props.loggedInUser);
        return (
            <div>
                {/* Routing starts */}
                <BrowserRouter>
                    <Switch>
                        {/* web view routing */}
                        <Route path='/about' component={About}/>

                        <Route exact path='/' component={Home}/>

                        <Route path='/contact' component={Contact}/>
                        {/* webview routing end */}


                        {/* cl routing */}
                        <Route exact path='/cl/'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='cl' ? <CLDashboard/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/dashboard'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='cl' ? <CLDashboard/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/profile'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='cl' ? <CLProfile/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/agentslist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='cl' && this.props.loggedInUser.active ? <CLAgentList/> :
                                   <Redirect to='/error'/>}/>

                        <Route exact path='/cl/campaignlist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='cl' && this.props.loggedInUser.active ? <CLCampaignList/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/cl/campaignlist/:campaignId'
                               component={(props) => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='cl'  && this.props.loggedInUser.active ?
                                   <CLCampaignDetails {...props}/> : <Redirect to='/error'/>}/>
                        {/* cl routing end */}


                        {/* admin routing starts */}
                        <Route path='/admin/campaignlist'
                               component={() => this.state.isLogin ?
                                   <AdminCampaignList/> : <Redirect to='/error'/>}/>

                        <Route exact path='/admin/'
                               component={() => this.state.isLogin ? <AdminDashboard/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/dashboard'
                               component={() => this.state.isLogin ? <AdminDashboard/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/agentslist'
                               component={() => this.state.isLogin ? <AdminAgentList/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/cllist'
                               component={() => this.state.isLogin ? <AdminCLList/> :
                                   <Redirect to='/error'/>}/>

                        <Route exact path='/admin/submissions'
                               component={() => this.state.isLogin ? <AdminSubmission/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/submissions/campaignlist/:campaignId'
                               component={(props) => this.state.isLogin ?
                                   <AdminSubmissionList {...props}/> : <Redirect to='/error'/>}/>
                        {/* admin routing end */}


                        {/* agent routing starts */}
                        <Route exact path='/agent/'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='agent' ?
                                   <AgentDashboard/> : <Redirect to='/error'/>}/>
                        <Route path='/agent/campaignlist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='agent' && this.props.loggedInUser.active ?
                                   <AgentCampaignList/> : <Redirect to='/error'/>}/>

                        <Route path='/agent/profile'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='agent' ?
                                   <AgentProfile/> : <Redirect to='/error'/>}/>

                        <Route path='/agent/dashboard'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role==='agent' ?
                                   <AgentDashboard/> : <Redirect to='/error'/>}/>
                        {/* agent routing ends */}

                        <Route path='/error' component={ErrorPage}/>
                        <Route exact path='/notfound' component={NotFound}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                {/* routing ends */}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        loggedInUser: state.users,
    }
}

export default connect(mapStateToProps)(MyApp);
