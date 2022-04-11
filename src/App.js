// src/App.js

import React, {Component} from 'react';
import axios from 'axios';// Library used to send asynchronous HTTP requests to RESTful endpoints (APIs)
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
      },
      credits: [],
      debits: [],
    }
  }

  // Make async API call to retrieve data from remote website
  async componentDidMount() {
    let linkToDebitAPI = 'https://moj-api.herokuapp.com/debits';  // Link to remote website API for Debit
    let linkToCreditAPI = 'https://moj-api.herokuapp.com/credits';  // Link to remote website API for Credit

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (users)
      let responseDebit = await axios.get(linkToDebitAPI);
      let responseCredit = await axios.get(linkToCreditAPI);
      console.log(responseDebit);  // Print out responses
      console.log(responseCredit); 
      // To get data object in the response, need to use "response.data"
      this.setState({credits: responseCredit.data, 
                     debits: responseDebit.data});  // Store received data in state's object
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
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