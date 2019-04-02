import React from 'react'
import {Link} from "react-router-dom";

class Header extends React.Component {

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
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}


export default Header;