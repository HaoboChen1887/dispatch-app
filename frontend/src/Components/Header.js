import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class Header extends Component {
    constructor() {
        super();
    }
    handleClick = () => {
        this.props.history.push('/')
    }

    onClickLogin = () => {
        this.props.history.push('/login')
    }

    onClickLogout = () => {
        axios.post('/dispatchPlus/logout', {
            proxy: {
                host:'localhost',
                port: 8080
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                alert('There was an error!');
            }
             else {
                alert('logout successfully');
                this.props.handleLoggedOut(false);
                this.props.history.push('/');
            }
        })
        .catch(error => {
            alert(`Error; ${error.message}`);
            console.error('There was an error!', error);
        });
    }

    conditionalButton = () => {
        const { loggedout,showButton, loggedIn } = this.props;
        if (showButton) {
            if (!loggedIn && !loggedout) {
                return <div className="home-nav-login-item" onClick={this.onClickLogin}>Sign up / Log in</div>
            } else if (loggedout) {
                return <div className="home-nav-login-item" onClick={this.onClickLogout}>Logout</div> 
            }
        }
        console.log("showButton", showButton, " loggedout", loggedout, " loggedIn ", loggedIn )
    }

    render() {
        
        return (
            <header className="app-header">
                <p className="app-title" onClick={this.handleClick}> &nbsp; Dispatch+ </p>
                <div className = 'home-nav-login'>
                    {this.conditionalButton()}
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
