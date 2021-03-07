import React from 'react';
import Navbar from "../Navbar";
import axios from 'axios';
import Main from "../Main"
import { Spin } from 'antd';

function ListItem(props) {
    const status = props.value.status;
    return (
      <li className="trackOrder">
          <p>Order number: {props.value.id}</p>
          <p>Description: {props.value.description}</p>
          <p>Expect to be delivered by</p>
          <p className="deliveryTime">{props.value.deliveryTime}</p>
          <p className="transitText">In Transit</p>
          {
              status == 1 && <p className="statusText">Device will departure on {props.value.departureTime}</p>
          }
          {
              status == 2 && <p className="statusText">Device will pick up package on {props.value.pickUpTime}</p>
          }
          {
              status == 3 && <p className="statusText">Package was picked up on {props.value.pickUpTime}</p>
          }
          <p> ----------------------------------------------------------------------------------- </p>
      </li>
    );
}

function OrderList(props) {
    const orders = props.orders;
    const listItems = orders.map((order) => <ListItem key={order.id} value={order} /> );
    return (
      <ul className="trackOrders">
          {listItems}
      </ul>
    );
}


class TrackOrder extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
            loggedStatus: false
        }
        this.getTrackOrder();
    }

    getTrackOrder = () => {
        let data = [];
        axios.get('/dispatchPlus/track', {
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
                    <div className="trackBox">
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

export default TrackOrder;