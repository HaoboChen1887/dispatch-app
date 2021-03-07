import React from 'react';

class Navbar extends React.Component{
    
    render() {
        const {tab1, tab2,tab3,tab4} = this.props
        const {link1, link2, link3, link4} = this.props
        return (
            <div>
                <nav className="home-nav-bar">
                    <ul className="home-menu">
                        <li className="menu-item"><a href={link1}>{tab1}</a></li>
                        <li className="menu-item"><a href={link2}>{tab2}</a></li>
                        <li className="menu-item"><a href={link3}>{tab3}</a></li>
                        <li className="menu-item"><a href={link4}>{tab4}</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navbar;