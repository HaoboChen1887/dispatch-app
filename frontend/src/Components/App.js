import React from 'react';
import Header from './Header'
import Footer from './Footer'
import RouterComponent from './Router'
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
  constructor () {
    super();
    console.log('App constructor')
    this.state = {
      showButton : true,
      loggedout : false,
      loggedIn : false
    }
  }

  handleShowButton = (para) => {
    this.setState ({...this, showButton : para})
  }

  handleLoggedOut = (para) => {
    this.setState ({...this, loggedout : para})
  }

  handleLogin = (para) => {
    if (para != null) {
      this.setState ({...this, loggedIn : para}, () => {
        console.log("App container", this.state);
      })
    }
    
  }

  render() {
    console.log('render App')
    console.log(`loggedin, ${this.props.loggedIn}`)
    console.log(`shoqButton, ${this.state.showButton}`)
    return (
      <Router className="App">
        <Header loggedIn={this.state.loggedIn} loggedout={this.state.loggedout} showButton={this.state.showButton} handleLoggedOut={this.handleLoggedOut}/>
        <RouterComponent 
          loggedIn={this.props.loggedIn} 
          handleLogin={this.handleLogin} 
          handleShowButton={this.handleShowButton}
          key={this.props.key}
          location={this.props.location}
          handleLoggedOut={this.handleLoggedOut}
          loggedout={this.state.loggedout}
        />
        <Footer/>
      </Router>
    );
  }
}

export default App;
