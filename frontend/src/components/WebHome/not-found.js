import React from 'react'
import Header from './Header'
import FooterWeb from "../footer/footer-home";

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div style={{minHeight: '79vh'}} className='center'>
                <h1>Page You Requested Is Not Found</h1>
            </div>
            <FooterWeb/>
        </div>

    )
};


export default ErrorPage;