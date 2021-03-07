import React, {Component} from 'react';

class OrderConfirm extends Component {
    render() {
        return (
            <div className="order-confirm">
                <div>Order confirm</div>
                <div>Order number: {this.props.id}</div>
            </div>
        );
    }
}

export default OrderConfirm;