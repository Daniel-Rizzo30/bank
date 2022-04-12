// src/App.js

import React, {Component} from 'react';
import axios from 'axios';// Library used to send asynchronous HTTP requests to RESTful endpoints (APIs)
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home.js';
import UserProfile from './components/UserProfile.js';
import LogIn from './components/Login.js';
import Credits from './components/Credits';
import Debits from './components/Debits';

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
      currentId: 0,
    }
  }

  // Make async API call to retrieve data from remote website
  async componentDidMount() {
    let linkToDebitAPI = 'https://moj-api.herokuapp.com/debits';  // Link to remote website API for Debit
    let linkToCreditAPI = 'https://moj-api.herokuapp.com/credits';  // Link to remote website API for Credit
    // API is of the form - {"id":"","description":"","amount": <number>,"date":""}

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (users)
      let responseDebit = await axios.get(linkToDebitAPI);
      let responseCredit = await axios.get(linkToCreditAPI);
      console.log(responseDebit.data);  // Print out responses
      console.log(responseCredit.data); 
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
  
  // Function to update credit array and update accountBalance
  // Should be passed down into credit component and should most likely be awaited ? 
  addCredit = (credit) => {
    console.log("addCredit"); // Show that the function began
    let newCredits = this.state.credits; // Copy old array
    newCredits.push(credit); // Add new posted value
    let newAccountBalance = this.state.accountBalance; // Copy old account balance
    newAccountBalance = newAccountBalance + + credit.amount; // Add more credit 
    // Needed to force math addition above with double + + for some reason
    this.setState({credit: newCredits, 
                   accountBalance:  newAccountBalance}); // Set new state values
    console.log(this.state.credits); // Check that it worked
  }

  // Function to update debit array and update accountBalance
  // Should be passed down into debit component and should most likely be awaited ? 
  addDebit = (debit) => {
    console.log("addDebit"); // Show that the function began
    let newDebits = this.state.debits; // Copy old array
    newDebits.push(debit); // Add new posted value
    let newAccountBalance = this.state.accountBalance; // Copy old account balance
    newAccountBalance -= debit.amount; // Add more debit by subtracting the amount
    this.setState({debit: newDebits, 
                   accountBalance: newAccountBalance}); // Set new state values
    console.log(this.state.debits); // Check that it worked
  }

  updateId = () => {
    this.setState({currentId: this.state.currentId + 1}); // Increment by 1 to get a new ID
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
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} 
                                         mockLogIn={this.mockLogIn}
                                         />);  // Pass props to "LogIn" component
    const DebitComponent = () => (<Debits debits={this.state.debits} 
                                          addDebit={this.addDebit} 
                                          accountBalance={this.state.accountBalance} 
                                          currentId={this.state.currentId}
                                          updateId={this.updateId}
                                          userName={this.state.currentUser.userName}
                                          />); // Added props to pass debits, acctBalance and addDebit function
    const CreditComponent = () => (<Credits credits={this.state.credits} 
                                            addCredit={this.addCredit} 
                                            accountBalance={this.state.accountBalance} 
                                            currentId={this.state.currentId}
                                            updateId={this.updateId}
                                            userName={this.state.currentUser.userName}
                                            />); // Added props to pass credits, acctBalance and addCredit function

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
            <Route exact path="/debits" render={DebitComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;