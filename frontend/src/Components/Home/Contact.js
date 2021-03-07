import React from 'react';
import Navbar from "../Navbar";

class Contact extends React.Component{
    render() {
        return (
            <div>
                 <Navbar tab1='Company' tab2='About' tab3='Blog' tab4='Contact us'
                         link1='company' link2='about' link3='blog' link4='contact'/>
                <div className = "home-about-wrapper">
                    <p className = "home-about-title">
                        Get in touch.
                    </p>
                    <ul>
                        <li>Phone: 1(888)123-4567</li>
                        <li>Email: customerservice@dispatchplus.com</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Contact;