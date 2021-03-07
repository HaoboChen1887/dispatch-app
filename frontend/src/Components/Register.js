import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor (props) {
        super(props)
        this.state = {
            button: this.props.button, 
            firstName : 'First name',
            lastName : 'Last name',
            email: 'Enter email',
            password : 'Enter password'
        }
    }

    handleFirstname = (e) => {
        this.setState({...this, firstName: e.target.value})
    }

    handleLastname = (e) => {
        this.setState({...this, lastName: e.target.value})
    }

    handleEmail = (e) => {
        this.setState({...this, email: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({...this, password: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`submitted ${this.state.firstName} ${this.state.lastName} ${this.state.email} ${this.state.password}`)

        const registerInfo = {
            "firstName":`${this.state.firstName}`,
                              "lastName" :`${this.state.lastName}`,
                              "customerPhone": 987654321,
                              "billingAddress": {"address": "ddddfdf", "city":"dffsf", "state":"FL", "zipcode":"45698", "country":"Germany"},
                              "user": {"emailId":`${this.state.email}`, "password":`${this.state.password}`,"enabled":true},
                              "cart": {"orderItems": [], "totalPrice": 0}
                            };
                              

        axios.post('/dispatchPlus/registration', registerInfo)
        .then((response) => {
            if (response.status !== 200) {
                alert('There was an error!');
            }
             else {
                alert('Account registered: ' + this.state.email);
                this.props.history.push('/login');
            }
        })
        .catch(error => {
            // this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
    }

    render() {
        return (
            <form className="user-sign-wrapper" onSubmit={this.handleSubmit}>
                <div className="register-box">
                    <div className="user-sign-heading">
                        <h3>Sign up</h3>
                    </div>

                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFirstname}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLastname}/>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword}/>
                    </div>

                    <div className = "user-sign-bottom">
                        
                        <button type="submit" className="user-sign-submit-btn">
                            Submit
                        </button>
                        <p> Already registered?
                            <a href="/login" onClick={this.handleButton}> Login</a>
                        </p>
                    </div>
                </div>
            </form>
        );
    }

    componentDidMount () {
        this.props.handleShowButton(false)
    }
} 
export default withRouter(Register);