import React from 'react'
import Header from './Header'
import {Divider} from 'antd';
import FooterWeb from "../footer/footer-home";

const Contact = () => {
    return (
        <div>
            <Header/>
            <div style={{minHeight: '79vh'}} className='center'>
                <div>
                    <Divider orientation="left">Left Text</Divider>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
                    <Divider orientation="right">Right Text</Divider>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                        probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
                </div>
            </div>
            <FooterWeb/>
        </div>
    )
};


export default Contact;