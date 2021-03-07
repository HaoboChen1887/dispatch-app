import React, { Component } from 'react';
import Navbar from "./Navbar";

class Home extends Component {
    render() {
        return (
            <div className="app-homepage">
                <Navbar tab1='Company' tab2='About' tab3='Blog' tab4='Contact us' link1='company' link2='about' link3='blog' link4='contact'/>
                <video id="home-drone-video" autoPlay="true" muted="true"
                       playsInline="true" webkit-playsinline="true" loop="true">
                    <source src="../../video/home-page-drone-video.mp4"
                            type="video/mp4"/>
                </video>
                <div className="front-slogan-wrapper">
                    <p id="front-slogan-text">
                        Get fast and intelligent <br />
                        dispatch in San Francisco.
                    </p>
                </div>
            </div>

        )
    }
}

export default Home;