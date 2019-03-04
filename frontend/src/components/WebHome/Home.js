import React from 'react'
import Header from './Header'
import {Carousel} from 'antd';
import FooterWeb from "../footer/footer-home";

const Home = () => {
    return (
        <div>
            <Header/>
            <div style={{ minHeight: '79vh' }} className='center'>
                <Carousel autoplay>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>
            <FooterWeb/>
        </div>

    )
}


export default Home;