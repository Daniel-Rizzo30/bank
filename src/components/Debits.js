// src/components/Debits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
  constructor(props) { // Create and initialize state
    super(props); // Always do super()
    this.state = {
      description: "",
      amount: 0,
    }
  }

  handleChange = (event) => {
    const {name, value, type, checked} = event.target
    // if the type just grabbed from the event is a checkbox, set the name of the event, 
    // which is named after an element in the state - so the element in the state - to 
    // the boolean checked, otherwise set [name], in state, to the value grabbed. 
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }  

  // List out the debit posts from the array from props onto the page
	debitsView  = () => {
    let debits = this.props.debits; // Grab from props the array, must be created with "let"
    let list = debits.map( (debit) => { // Use map to list each debit item
      let date = debit.date.slice(0,10); // Get the first ten chars of the date 
      // Give map a list item, with key using the id, which lists the other values
      return (
        <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
      );
    });
    return list;
  }

  handleSubmit = (event) =>  {
    event.preventDefault(); // Stop page refresh
    let debit = {
      amount: this.state.amount,
      description: this.state.description,
      date: new Date(),
      id: this.props.currentId
    };
    debit.date = debit.date.toISOString(); // Turn into the string used in the API
    this.props.updateId(); // Make sure each ID is unique
    this.props.addDebit(debit); // Finally add to the debt from App.js
  }

  render() {
    return (
    	<div>
    	   <h1>Debits</h1>
          {/* Make a form, which uses the function from App.js to add to that state*/}  
          <AccountBalance accountBalance={this.props.accountBalance}/>
           <form onSubmit={this.handleSubmit}>
             <input 
             type="text" 
             name="description"
             placeholder='Description'
             value={this.state.description}
             onChange={this.handleChange} 
             />
             <input 
             type="number" 
             name="amount"
             placeholder='Amount'
             value={this.state.amount}
             onChange={this.handleChange}  
             />
             <button type="submit">Add Debit</button>
           </form>

          <ul>
            {this.debitsView()}
          </ul>

           <Link to="/">Return to Home</Link>
    	</div>
    );
  }
}
export default Debits;