import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Main from './Main'

import Company from './Home/Company'
import About from './Home/About'
import Blog from './Home/Blog'
import Contact from './Home/Contact'

import AddOrder from './Main/AddOrder'
import OrderHistory from './Main/OrderHistory'
import TrackOrder from './Main/TrackOrder'
import UserInfo from './Main/UserInfo'

class RouterComponent extends React.Component {
  render() {
      const { handleLogin, handleShowButton, key, location, handleLoggedOut } = this.props;
    return (
        <Switch key={key} location={location}>   
            <Route path="/" exact component={Home} />
            <Route path="/login" render={() => (<Login handleLogin={handleLogin} handleShowButton={handleShowButton}/>)} />
            <Route path="/register" render={() => (<Register handleShowButton={handleShowButton}/>)} />
            <Route path="/main" render={() => (<Main />)} />

            <Route path="/company" render={() => <div><Company/></div>} />
            <Route path="/about" render={() => <About/>} />
            <Route path="/blog" render={() => <Blog/>} />
            <Route path="/contact" render={() => <Contact/>} />

            <Route path="/addorder" render={() => <AddOrder handleLoggedOut={handleLoggedOut}/>} />
            <Route path="/orderhistory" render={() => <OrderHistory handleLoggedOut={handleLoggedOut}/>} />
            <Route path="/trackorder" render={() => <TrackOrder handleLoggedOut={handleLoggedOut}/>} />
            <Route path="/userinfo" render={() => <UserInfo handleLoggedOut={handleLoggedOut}/>} />
        </Switch>
    );
  }
}

export default RouterComponent;