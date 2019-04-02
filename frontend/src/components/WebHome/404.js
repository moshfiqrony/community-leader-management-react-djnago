import React from 'react'
import Header from './header-error'
import FooterWeb from "../footer/footer-home";

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div style={{minHeight: '79vh'}} className='center'>
                <img src='/404.png'/>
                <h6>Unauthorized Access. Contact Admin to Activate your profile. If you are new, please Register</h6>
            </div>
            <FooterWeb/>
        </div>

    )
};


export default ErrorPage;