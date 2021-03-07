import React from 'react';
import Navbar from "../Navbar";
import axios from 'axios';
import Main from "../Main"
import { Spin } from 'antd';

class UserInfo extends React.Component{
    constructor() {
        super();
        this.state = {
            data: {}
        }
        this.getInfo();
    }

    getInfo = () => {
        let data = {};
        axios.get('/dispatchPlus/customer_info', {
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
                  data = response.data;
                  this.setState({data: data})
              }
          })
          .catch(error => {
              alert(`Error; ${error.message}`);
              console.error('There was an error!', error);
          });
    }
    render() {
        //console.log(this.props.loggedIn)
        //console.log(this.state.data);
        const {firstName, lastName, customerPhone, billingAddress } = this.state.data;
        if (!billingAddress) {
            return (
              <div>
                  <Main />
                  <div className="spinBox">
                      <Spin className="spinBox" tip="Loading..." size="large" />
                  </div>
              </div>
            );
        }
        const {address, city, state, zipcode, country} = billingAddress;
        return (
          <div>
              <Main />
              <div className="userInfoTop">
                  <p className="userInfomation">Name: {firstName} {lastName} </p>
                  <p className="userInfomation">Phone numeber: {customerPhone}</p>
                  <p className="userInfomation">Address: {address}, {city}, {state} {zipcode}, {country}</p>
              </div>
          </div>
        );
    }
    componentDidMount () {
        this.props.handleLoggedOut(true)
    }
}

export default UserInfo;