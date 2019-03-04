import React from 'react'
import Header from './Header'
import {Divider} from "antd";
import FooterWeb from '../footer/footer-home'

const About = () => {
    return (
        <div>
            <Header/>
            <div style={{ minHeight: '79vh' }} className='center'>
                <div>
                    <Divider orientation="left"><h4>What We Do</h4></Divider>
                    <p>MARKET RESEARCH ON DEMAND, Generate high quality insights for your business using
                        human intelligence and machine learning</p>
                </div>

                <Divider orientation="right"><h4>How It Works</h4></Divider>
                <div className='container'>
                    <h3>Surveys Made Simple</h3><br/>
                    <p>We make it easy to create, launch and manage campaigns. Use our survey builder to specify
                        geographical coverage and demographics of target groups, design forms that can capture photos,
                        error
                        validation, logic, repeats and much more.</p>
                    <h3>Find the Right People</h3><br/>
                    <p>Your surveys are automatically routed to a nationwide network of qualified agents who collect the
                        data on mobile phones. All our agents are screened to make sure they can do great work.</p>
                    <h3>Get Real Time Insights</h3><br/>
                    <p>We don't like waiting either and generate results in hours, not days or weeks. Our quality
                        control features let you set up test questions and actively monitor agent performance so you can
                        breathe easy, knowing that your work is in safe hands.</p>
                </div>
            </div>
            <FooterWeb/>
        </div>
    )
}


export default About;