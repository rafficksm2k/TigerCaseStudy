import React from "react";
import logo from '../../images/logo.png'

const Header = (props) => {
    return (
        <React.Fragment>
            <div class="header">
                <a href="" class="logo" id="logo-id"> <img src={logo} alt="logo" /></a>
                <p class='header-name'>Product Dashboard</p>
                {/* <div class="header-right">
                    <a class="contact-cn" href="contact">Contact</a>
                </div> */}
            </div>
        </React.Fragment>
    )
};

export default Header;
