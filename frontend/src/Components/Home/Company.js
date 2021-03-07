import React from 'react';
import Navbar from "../Navbar";

class Company extends React.Component{
    render() {
        return (
            <div>
                 <Navbar tab1='Company' tab2='About' tab3='Blog' tab4='Contact us'
                         link1='company' link2='about' link3='blog' link4='contact'/>
                <div className = "home-about-wrapper">
                    <p className = "home-about-title">
                        A New Era of Delivery Industry.
                    </p>
                    <p>
                        With a combination of web technology, autonomous drones and self-driving robots,
                        Dispatch+ provide same day delivery service and make local delivery faster, smarter
                        and more cost-efficient in San Francisco.
                    </p>
                    <p>
                        This revolution of local delivery can reduce roadway congestion and improve safety with
                        less heavy traffic and fewer conflicts between delivery vehicles and other travel modes.
                        Dispatch+ also help reduce greenhouse gas emissions via rechargeable green energy drones
                        and robots rather than traditional delivery trucks.
                    </p>
                </div>
            </div>
        );
    }
}

export default Company;