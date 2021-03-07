import React, {Component} from 'react';
import {Button, Form, Input, InputNumber, Select} from "antd";

class OrderInfo extends Component {
    // setNextStep = () => {
    //     this.props.onNextStep("OrderOption");
    // }

    onFinish = (values) => {
        console.log('Success:', values);
        const pickstreet = values["pickup street"];
        const pickapt = values["pickup apt"] === undefined ? "" : values["pickup apt"];
        const pickcity = values["pickup city"] === undefined ? "San Francisco" : values["pickup city"];
        const pickstate = values["pickup state"] === undefined ? "CA" : values["pickup state"];
        const pickzip = values["pickup zipcode"] === undefined ? "" : values["pickup zipcode"];
        const delistreet = values["delivery street"];
        const deliapt = values["delivery apt"] === undefined ? "" : values["pickup apt"];
        const delicity = values["delivery city"] === undefined ? "San Francisco" : values["pickup city"];
        const delistate = values["delivery state"] === undefined ? "CA" : values["pickup state"];
        const delizip = values["delivery zipcode"] === undefined ? "" : values["pickup zipcode"];
        const weights = values["order weights"];
        const description = values["order description"] === undefined ? "" : values["order description"];
        const orderInfo = {
            startAddress: `${pickstreet} ${pickapt}, ${pickcity}, ${pickstate} ${pickzip}`,
            destAddress: `${delistreet} ${deliapt}, ${delicity}, ${delistate} ${delizip}`,
            weight: weights,
            description: description
        }
        this.props.changeOrderInfo(orderInfo);
        this.props.onNextStep("OrderOption");
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div style={{ left: 'auto', right: 'auto', width: '600px', margin: 'auto' }}>
                <Form
                  name="basic"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                    <div>Pickup location</div>
                    <div style={{ height: '30px' }}/>
                    <Form.Item>
                        <Form.Item name="pickup street" rules={[
                            {
                                required: true,
                                message: 'Please input your pickup street!',
                            },
                        ]} style={{ display: 'inline-block', width: 'calc(80% - 8px)'}}>
                            <Input placeholder="Street"/>
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '16px' }}/>
                        <Form.Item name="pickup apt" style={{ display: 'inline-block', width: 'calc(20% - 8px)'}}>
                            <Input placeholder="Apt #"/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="pickup city" style={{ display: 'inline-block', width: 'calc(34% - 8px)'}}>
                            <Input placeholder="City"/>
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '12px' }}/>
                        <Form.Item name="pickup state" style={{ display: 'inline-block', width: 'calc(33% - 8px)'}}>
                            <Input placeholder="State"/>
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '12px' }}/>
                        <Form.Item name="pickup zipcode" style={{ display: 'inline-block', width: 'calc(33% - 8px)'}}>
                            <Input placeholder="Zipcode"/>
                        </Form.Item>
                    </Form.Item>

                    <div>Delivery location</div>
                    <div style={{ height: '30px' }}/>
                    <Form.Item>
                        <Form.Item name="delivery street" rules={[
                            {
                                required: true,
                                message: 'Please input your delivery street!',
                            },
                        ]} style={{ display: 'inline-block', width: 'calc(80% - 8px)'}}>
                            <Input placeholder="Street"/>
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '16px' }}/>
                        <Form.Item name="delivery apt" style={{ display: 'inline-block', width: 'calc(20% - 8px)'}}>
                            <Input placeholder="Apt #"/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="delivery city" style={{ display: 'inline-block', width: 'calc(34% - 8px)'}}>
                            <Input placeholder="City"/>
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '12px' }}/>
                        <Form.Item name="delivery state" style={{ display: 'inline-block', width: 'calc(33% - 8px)'}}>
                            <Input placeholder="State"/>
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '12px' }}/>
                        <Form.Item name="delivery zipcode" style={{ display: 'inline-block', width: 'calc(33% - 8px)'}}>
                            <Input placeholder="Zipcode"/>
                        </Form.Item>
                    </Form.Item>

                    <div>Order information</div>
                    <div style={{ height: '30px' }}/>
                    <Form.Item>
                        <Form.Item name="order weights" rules={[
                            {
                                required: true,
                                message: 'Please input your order weights!',
                            },
                        ]} style={{ display: 'inline-block', width: 'calc(50% - 12px)'}}>
                            <Input placeholder="Order weights (lb)"/>
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '24px' }}/>
                        <Form.Item name="order description" style={{ display: 'inline-block', width: 'calc(50% - 12px)'}}>
                            <Input placeholder="Order description"/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    );
    }
}

export default OrderInfo;