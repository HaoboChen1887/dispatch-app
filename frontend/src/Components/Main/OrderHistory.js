import React from 'react';
import Navbar from "../Navbar";
import axios from 'axios';
import Main from "../Main"
import { Spin } from 'antd';

function ListItem(props) {
    if (props.value.status >= 4) {
        return (
          <li className="historyOrder">
              <p>Order number: {props.value.id}</p>
              <p>Description: {props.value.description}</p>
              <p>Delivered on {props.value.deliveryTime}</p>
          </li>
        );
    }
    else {
        return (
          <li className="historyOrder">
              <p>Order number: {props.value.id}</p>
              <p>Description: {props.value.description}</p>
              <p>Arriving on {props.value.deliveryTime}</p>
          </li>
        );
    }
}

function OrderList(props) {
    const orders = props.orders;
    const listItems = orders.map((order) => <ListItem key={order.id} value={order} /> );
    return (
      <ul className="historyOrders">
          {listItems}
      </ul>
    );
}

class OrderHistory extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
            loggedStatus: false
        }
        this.getOrderHistory();
    }

    getOrderHistory = () => {
        let data = [];
        axios.get('/dispatchPlus/history', {
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
                  this.setState(preState => {
                      return {
                          data: data,
                          loggedStatus: true
                      }
                  })
              }
          })
          .catch(error => {
              alert(`Error; ${error.message}`);
              console.error('There was an error!', error);
          });
    }

    render() {
        return (
          <div>
              <Main />
              {
                  this.state.data.length === 0 ?
                    <div className="spinBox">
                        <Spin className="spinBox" tip="Loading..." size="large" />
                    </div>
                    :
                    <div className="historyBox">
                        OrderHistory
                        <OrderList orders={this.state.data}/>
                    </div>
              }
          </div>
        );
    }
    componentDidMount () {
        this.props.handleLoggedOut(true)
    }
}

export default OrderHistory;