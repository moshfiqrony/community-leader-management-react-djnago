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
                    <Divider orientation="left">Official Contact</Divider>
                    <h4>Email: support@getd2.com</h4>
                    <h4>Phone: 01996642272</h4>
                    <h4>Facebook Page: <a>https://www.facebook.com/dignityanddata</a></h4>
                </div>
            </div>
            <FooterWeb/>
        </div>
    )
};


export default Contact;