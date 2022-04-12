// src/components/Credits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
  // constructor() { // Create and initialize state
  //   super(); // Always do super()
  //   this.state = {
  //   }
  // }
  // List out the credit posts from the array from props onto the page
	creditView = () => {
      const { credits } = this.props.credits; // Grab from props the array
      return credits.map((credit) => { // Use map to list each credit item
          let date = credit.date.slice(0,10); // Get the first ten chars of the date
          // Give map a list item, with key using the id, which lists the other values
          return <li key={credit.id}>{credit.amount} {credit.description} {date}</li> ; 
      }) 
  }
  render() {
    return (
    	<div>
    	   <h1>Credits</h1>
         {/* this.creditsView is not working */}
    	   {/* {this.creditsView()} Use the above function to list credit items onto the page */}
          {/* Make a form, which uses the function from App.js to add to that state*/}  
          <AccountBalance accountBalance={this.props.accountBalance}/>
           <form onSubmit={this.props.addCredit}>
             <input type="text" name="description" />
             <input type="number" name="amount" />
             <button type="submit">Add Credit</button>
           </form>

           <Link to="/">Return to Home</Link>
    	</div>
    );
  }
}
export default Credits;