import React from 'react'
import RegDrawer from "./RegDrawer";
import {Link} from "react-router-dom";
import LoginDrawer from './LoginDrawer'
import {Button, Drawer, Form} from 'antd';


const Reg = Form.create({name: 'normal_login'})(RegDrawer);
const Login = Form.create({name: 'normal_login'})(LoginDrawer);

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            Reg: {
                visible: false,
            },
            Log: {
                visible: false,
            }

        }
    }

    showDrawer = (e) => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: {
                visible: true
            }
        });
    };

    onClose = (e) => {
        this.setState({
            Reg: {visible: false,},
            Log: {visible: false,},
        });
    };


    render() {
        return (
            <div className='navbar-fixed'>
                <nav style={{backgroundColor: '#2c2f0b'}}>
                    <div className="nav-wrapper">
                        <Link to='/' className="brand-logo"><img style={{paddingTop: 10, paddingLeft: 10}}
                                                             src='http://getd2.com/img/logo-new.png'
                                                             alt='logo'/></Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            <Button name='Reg' className='btn  brown darken-4'
                                    onClick={this.showDrawer}>Registration</Button>
                            <Button name='Log' className='btn  brown darken-4' onClick={this.showDrawer}>Login</Button>


                        </ul>
                        <Drawer
                            title="Login Panel"
                            placement="right"
                            closable={false}
                            width={350}
                            onClose={this.onClose}
                            visible={this.state.Log.visible}
                        >
                            <Login/>
                        </Drawer>
                        <Drawer
                            title="Registration Panel"
                            placement="right"
                            closable={false}
                            width={350}
                            onClose={this.onClose}
                            visible={this.state.Reg.visible}
                        >
                            <Reg/>
                        </Drawer>

                    </div>
                </nav>
            </div>
        );
    }
}


export default Header;