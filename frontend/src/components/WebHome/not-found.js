import React from 'react'
import Header from './header-error'
import FooterWeb from "../footer/footer-home";

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div style={{minHeight: '79vh'}} className='center'>
                <img src='/notfound.png'/>
            </div>
            <FooterWeb/>
        </div>

    )
};


export default ErrorPage;