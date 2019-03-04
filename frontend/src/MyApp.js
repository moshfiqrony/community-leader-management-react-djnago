import React from 'react';
import 'antd/dist/antd.css';
import 'materialize-css/dist/css/materialize.min.css';

//webview components
import Home from './components/WebHome/Home'
import {BrowserRouter, Route, Redirect} from "react-router-dom";
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
import AgentDashboard from './components/pages/agents/dashboard';
import AgentProfile from './components/pages/agents/profile';
import AgentCampaignList from './components/pages/agents/campaign-list';

//extra components
import ErrorPage from './components/WebHome/404';



// main app
class MyApp extends React.Component {
    constructor(){
        super();
        this.state = {
            user: {
                isLogin: true,
                active: true,
            },
            
        }
    }
    render() {
        return (
            <div>
                {/* Routing starts */}
                <BrowserRouter>
                    <div>
                        {/* web view routing */}
                        <Route path='/about' component={About}/>
                        
                        <Route exact path='/' component={Home}/>

                        <Route path='/contact' component={Contact}/>
                        {/* webview routing end */}


                        {/* cl routing */}
                        <Route exact path='/cl/' component={() => this.state.user.isLogin ? <CLDashboard/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/dashboard' component={() => this.state.user.isLogin ? <CLDashboard/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/profile' component={() => this.state.user.isLogin ? <CLProfile/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/agentslist' component={() => this.state.user.isLogin && this.state.user.active ? <CLAgentList/> : <Redirect to='/error'/>}/>

                        <Route exact path='/cl/campaignlist' component={() => this.state.user.isLogin && this.state.user.active ? <CLCampaignList/> : <Redirect to='/error'/>}/>

                        <Route path='/cl/campaignlist/:campaignId' component={(props) => this.state.user.isLogin && this.state.user.active ? <CLCampaignDetails {...props}/> : <Redirect to='/error'/>}/>
                        {/* cl routing end */}


                        {/* admin routing starts */}
                        <Route path='/admin/campaignlist' component={() => this.state.user.isLogin && this.state.user.active ? <AdminCampaignList/> : <Redirect to='/error'/>}/>
                        
                        <Route exact path='/admin/' component={() => this.state.user.isLogin && this.state.user.active ? <AdminDashboard/> : <Redirect to='/error'/>}/>

                        <Route path='/admin/dashboard' component={() => this.state.user.isLogin && this.state.user.active ? <AdminDashboard/> : <Redirect to='/error'/>}/>

                        <Route path='/admin/agentslist' component={() => this.state.user.isLogin && this.state.user.active ? <AdminAgentList/> : <Redirect to='/error'/>}/>

                        <Route path='/admin/cllist' component={() => this.state.user.isLogin && this.state.user.active ? <AdminCLList/> : <Redirect to='/error'/>}/>

                        <Route exact path='/admin/submissions' component={() => this.state.user.isLogin && this.state.user.active ? <AdminSubmission/> : <Redirect to='/error'/>}/>

                        <Route path='/admin/submissions/campaignlist/:campaignId' component={(props) => this.state.user.isLogin && this.state.user.active ? <AdminSubmissionList {...props}/> : <Redirect to='/error'/>}/>
                        {/* admin routing end */}


                        {/* agent routing starts */}
                        <Route path='/agent/campaignlist' component={() => this.state.user.isLogin && this.state.user.active ? <AgentCampaignList/> : <Redirect to='/error'/>}/>


                        {/* agent routing ends */}

                        <Route path='/error' component={ErrorPage}/>
                    </div>
                </BrowserRouter>
                {/* routing ends */}
            </div>
        );
    }
}

export default MyApp;
