import React from 'react';
import Navbar from "../Navbar";

class About extends React.Component{
    render() {
        return (
            <div>
                 <Navbar tab1='Company' tab2='About' tab3='Blog' tab4='Contact us'
                         link1='company' link2='about' link3='blog' link4='contact'/>
                 <div className = "home-about-wrapper">
                     <p className = "home-about-title">
                         The Autonomous Delivery Drone and Robot.
                     </p>
                     <p>
                         Dispatch+ delivery drones are advanced flying devices that can carry
                         items within 10-mile radius. Our delivery drones can reach an attitude
                         of 300 ft to avoid city traffic.
                     </p>
                     <p>
                         Dispatch+ delivery robots move at pedestrian speed and can carry items
                         within 10-mile radius. Our delivery robots are extremely safe that can
                         avoid collisions with people and navigate around obstacles.
                     </p>
                     <p>
                         Packages, groceries and food are directly delivered from anywhere, at the
                         time that the customer requests via Dispatch+ website. Once ordered the drones’
                         and robots’ entire journey and location can be monitored online. Dispatch+
                         provide a new era of instant delivery that works around your schedule at much
                         lower costs and much shorter delivery time.
                     </p>
                 </div>
            </div>
        );
    }
}

export default About;