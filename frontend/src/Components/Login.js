import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            email : 'email',
            password : 'password',
        }
    }

    handleEmail = (e) => {
        this.setState({...this, email: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({...this, password: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${e}`)
    }
 
    handleRequest = () => {
        console.log(`BUTTON CLICK : submitted ${this.state.email} ${this.state.password}`)
        const loginInfo = {"email":`${this.state.email}`, "password": `${this.state.password}`};

        axios.post('/dispatchPlus/login', loginInfo, {
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
                alert('Account Logged In: ' + this.state.email);
                this.props.handleLogin(true);
                this.props.handleShowButton(true);
                this.props.history.push('/addorder');
            }
        })
        .catch(error => {
            alert(`Error; ${error.message}`);
            console.error('There was an error!', error);
        });
    }

    render() {
        return (
            <form className="user-sign-wrapper" onSubmit={this.handleSubmit} onFinish={this.onFinish}>
                <div className="login-box">
                    <div class = "user-sign-heading">
                        <h3>Sign in</h3>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword}/>
                    </div>

                    <div className="user-sign-bottom">
                        <button type="submit" className="user-sign-submit-btn" onClick={this.handleRequest}>
                            Submit
                        </button>
                        <p><a href="/contact">Forgot Password?</a></p>
                        <p>New User? <a href="/register">Register</a></p>
                    </div>
                </div>
            </form>
        )
    }

    componentDidMount () {
        this.props.handleShowButton(false)
    }
}

export default withRouter(Login);
