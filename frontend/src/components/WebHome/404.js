import React from 'react'
import Header from './Header'
import FooterWeb from "../footer/footer-home";

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div style={{minHeight: '79vh'}} className='center'>
                <h1>You Are not Authorized To Access it. Contact admin to Active your profile</h1>
            </div>
            <FooterWeb/>
        </div>

    )
};


export default ErrorPage;