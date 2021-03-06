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
import CLProfileEdit from './components/pages/cl/container/profile-edit'
//admin components
import AdminLogin from './components/pages/admin/login';
import AdminCampaignList from './components/pages/admin/campaign-list';
import AdminDashboard from './components/pages/admin/dashboard';
import AdminAgentList from './components/pages/admin/agent-list';
import AdminCLList from './components/pages/admin/cl-list';
import AdminSubmission from './components/pages/admin/submissions';
import AdminSubmissionList from './components/pages/admin/submissions-list';
import AdminSubmissionsView from './components/pages/admin/submission-view';
import AgentCampaignDetails from './components/pages/agents/campaign-details';
//agents routing
import AgentCampaignList from './components/pages/agents/campaign-list';
import AgentProfile from "./components/pages/agents/profile";
import AgentDashboard from './components/pages/agents/dashboard';
import AgentProfileEdit from './components/pages/agents/container/profile-edit';
//extra components
import ErrorPage from './components/WebHome/404';
import NotFound from './components/WebHome/not-found';


// main app
class MyApp extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogin: true,
            url: '',
        }
    }


    render() {
        console.log(this.props.loggedInUser);
        if (this.props.loggedInUser.isLogin === true && this.props.loggedInUser.role === 'cl') {
            this.state.url = '/cl';
        } else if (this.props.loggedInUser.isLogin === true && this.props.loggedInUser.role === 'agent') {
            this.state.url = '/agent';
        }else if(this.props.loggedInUser.isLogin === true && this.props.loggedInUser.role === 'admin'){
            this.state.url = '/admin';
        }
        return (
            <div>
                {/* Routing starts */}
                <BrowserRouter>
                    <Switch>
                        {/* web view routing */}
                        <Route path='/about'
                               component={() => this.props.loggedInUser.isLogin ? <Redirect to={this.state.url}/> :
                                   <About/>}/>

                        <Route exact path='/'
                               component={() => this.props.loggedInUser.isLogin ? <Redirect to={this.state.url}/> :
                                   <Home/>}/>

                        <Route path='/contact'
                               component={() => this.props.loggedInUser.isLogin ? <Redirect to={this.state.url}/> :
                                   <Contact/>}/>
                        <Route path='/d2admin'
                               component={() => this.props.loggedInUser.isLogin ? <Redirect to={this.state.url}/> :
                                   <AdminLogin/>}/>
                        {/* webview routing end */}


                        {/* cl routing */}
                        <Route exact path='/cl/'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'cl' ?
                                   <CLDashboard/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/dashboard'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'cl' ?
                                   <CLDashboard/> : <Redirect to='/error'/>}/>

                        <Route exact path='/cl/profile'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'cl' ?
                                   <CLProfile/> : <Redirect to='/error'/>}/>
                        <Route path='/cl/profile/edit'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'cl' ?
                                   <CLProfileEdit/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/agentslist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'cl' && this.props.loggedInUser.active ?
                                   <CLAgentList/> :
                                   <Redirect to='/error'/>}/>

                        <Route exact path='/cl/campaignlist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'cl' && this.props.loggedInUser.active ?
                                   <CLCampaignList/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/cl/campaignlist/:campaignId'
                               component={(props) => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'cl' && this.props.loggedInUser.active ?
                                   <CLCampaignDetails {...props}/> : <Redirect to='/error'/>}/>
                        {/* cl routing end */}


                        {/* admin routing starts */}

                        <Route path='/admin/campaignlist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'admin' ?
                                   <AdminCampaignList/> : <Redirect to='/error'/>}/>

                        <Route exact path='/admin/'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'admin' ?
                                   <AdminDashboard/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/dashboard'
                               component={() => this.state.isLogin ? <AdminDashboard/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/agentslist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'admin' ?
                                   <AdminAgentList/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/cllist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'admin' ?
                                   <AdminCLList/> :
                                   <Redirect to='/error'/>}/>

                        <Route exact path='/admin/submissions'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'admin' ?
                                   <AdminSubmission/> :
                                   <Redirect to='/error'/>}/>

                        <Route exact path='/admin/submissionsview'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'admin' ?
                                   <AdminSubmissionsView/> :
                                   <Redirect to='/error'/>}/>

                        <Route path='/admin/submissions/campaignlist/:campaignId'
                               component={(props) => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'admin' ?
                                   <AdminSubmissionList {...props}/> : <Redirect to='/error'/>}/>
                        {/* admin routing end */}


                        {/* agent routing starts */}
                        <Route exact path='/agent/'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'agent' ?
                                   <AgentDashboard/> : <Redirect to='/error'/>}/>
                        <Route exact path='/agent/campaignlist'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'agent' && this.props.loggedInUser.active ?
                                   <AgentCampaignList/> : <Redirect to='/error'/>}/>
                        <Route path='/agent/campaignlist/:campaignId'
                               component={(props) => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'agent' && this.props.loggedInUser.active ?
                                   <AgentCampaignDetails {...props}/> : <Redirect to='/error'/>}/>

                        <Route exact path='/agent/profile'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'agent' ?
                                   <AgentProfile/> : <Redirect to='/error'/>}/>
                        <Route path='/agent/profile/edit'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'agent' ?
                                   <AgentProfileEdit/> : <Redirect to='/error'/>}/>

                        <Route path='/agent/dashboard'
                               component={() => this.props.loggedInUser.isLogin && this.props.loggedInUser.role === 'agent' ?
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
