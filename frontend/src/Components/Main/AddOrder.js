import React from 'react';
import Navbar from "../Navbar";
import OrderInfo from './AddOrder/OrderInfo'
import OrderOption from './AddOrder/OrderOption'
import OrderConfirm from "./AddOrder/OrderConfirm";

class AddOrder extends React.Component{
    constructor() {
        super();
        this.state = {
            step: "OrderInfo",
            id: -1,
            orderInfo: {
                startAddress: "3022 Barclay Way, Ann Arbor, MI 48105",
                destAddress: "4260 Plymouth Rd, Ann Arbor, MI 48109",
                weight: 12,
                description: "haha"
            }
        }
    }

    changeID = (value) => {
        this.setState({id: value});
    }

    changeOrderInfo = (info) => {
        this.setState({orderInfo: info});
    }

    handleNextStep = (nextStep, orderInfo) => {
        this.setState(prestate => ({
            ...prestate,
            step: nextStep,
        }));
    }

    render() {
        const { step, orderInfo, id } = this.state;
        return (
            <div>
                 <Navbar tab1='Add Order' tab2='Track Order' tab3='Order History' tab4='User Info' link1='addorder' link2='trackorder' link3='orderhistory' link4='userinfo'/>
                 <div className="add-order">
                    {
                        step === "OrderInfo" ? <OrderInfo onNextStep={this.handleNextStep} changeOrderInfo={this.changeOrderInfo}/>
                        :
                        step === "OrderOption" ? <OrderOption orderInfo={ orderInfo } onNextStep={ this.handleNextStep } changeID = {this.changeID}/>
                        :
                        <OrderConfirm id={id}/>
                    }
                 </div>
            </div>
        );
    }

    componentDidMount () {
        this.props.handleLoggedOut(true)
    }
}

export default AddOrder;
