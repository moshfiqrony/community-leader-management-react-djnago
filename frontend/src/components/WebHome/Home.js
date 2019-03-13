import React from 'react'
import Header from './Header'
import {Carousel} from 'antd';
import FooterWeb from "../footer/footer-home";

const Home = () => {
    return (
        <div id='printArea'>
            <Header/>
            <div style={{minHeight: '79vh'}} className='center'>
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
};

//
// function handlePrint() {
//     var div = "<html><head><style> .hideforpdf{display: none;}td{text-align:center;}table{border: 1px solid black;float: center;}table tr{border: 1px solid black;}table tr td{border: 1px solid black;}table tr th{border: 1px solid black;}</style></head><body>";
//     div += document.getElementById('printArea').innerHTML;
//     div += "</body></html>";
//     var win = window.open("", "", "width=960,height=500");
//     win.document.write("<center><h1>Student Grade Sheet</h1></center><br><br>");
//     win.document.write(div);
//     win.document.write("<br><br><center><p>&copy All Rights Reserved By IUBAT UNIVERSITY</p><p>Developed By Moshfiqur Rahman Rony</p></center>");
//     win.print();
// }


export default Home;