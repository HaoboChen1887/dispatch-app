import React from 'react';
import Navbar from "./Navbar";

class Main extends React.Component{
    render() {
        return (
            <div>
                <Navbar tab1='Add Order' tab2='Track Order' tab3='Order History' tab4='User Info' link1='addorder' link2='trackorder' link3='orderhistory' link4='userinfo'/>
            </div>
        );
    }
}

export default Main;