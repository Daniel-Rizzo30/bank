// src/components/Debits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
  constructor() { // Create and initialize state
    super(); // Always do super()
    this.state = {
    }
  }
  // List out the debit posts from the array from props onto the page
	debitsView = () => {
      const { debits } = this.props.debits; // Grab from props the array
      return debits.map((debit) => { // Use map to list each debit item
          let date = debit.date.slice(0,10); // Get the first ten chars of the date
          // Give map a list item, with key using the id, which lists the other values
          return <li key={debit.id}>{debit.amount} {debit.description} {date}</li> ; 
      }) 
  }
  render() {
    return (
    	<div>
    	   <h1>Debits</h1>
    	   {this.debitsView()} {/* Use the above function to list debit items onto the page */}
          {/* Make a form, which uses the function from App.js to add to that state*/}  
          <AccountBalance accountBalance={this.props.accountBalance}/>
           <form onSubmit={this.props.addDebit}>
             <input type="text" name="description" />
             <input type="number" name="amount" />
             <button type="submit">Add Debit</button>
           </form>

           <Link to="/">Return to Home</Link>
    	</div>
    )
  }
}
export default Debits;