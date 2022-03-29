// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home.js';
import UserProfile from './components/UserProfile.js';
import LogIn from './components/Login.js';
import Credits from './components/Credits.js'
import Debits from './components/Debits.js'

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitsComponent = () => (<Debits />) // ADD PROPS
    const CreditsComponent = () => (<Credits />) // ADD PROPS

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;