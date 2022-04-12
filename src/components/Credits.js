// src/components/Credits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
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

  // List out the credit posts from the array from props onto the page
	creditsView  = () => {
    let credits = this.props.credits; // Grab from props the array, must be created with "let"
    let list = credits.map( (credit) => { // Use map to list each credit item
      let date = credit.date.slice(0,10); // Get the first ten chars of the date 
      // Give map a list item, with key using the id, which lists the other values
      let descriptionToCaps = credit.description.toUpperCase(); // Display in all caps like a bank usually does
      return (
        <li key={credit.id}>${credit.amount}&emsp;&emsp;{descriptionToCaps}&emsp;on:&emsp;{date}</li>
      );
    });
    return list;
  }

  handleSubmit = (event) =>  {
    event.preventDefault(); // Stop page refresh
    let credit = { // Add attributes to credit
      amount: this.state.amount,
      description: this.state.description,
      date: new Date(),
      id: this.props.currentId
    };
    credit.date = credit.date.toISOString(); // Turn into the string used in the API
    this.props.updateId(); // Make sure each ID is unique
    this.props.addCredit(credit); // Finally add to the debt from App.js
  }

  render() {
    return (
    	<div>
         <img src="https://picsum.photos/200/200" alt="bank"/>
    	   <h1>Credits</h1>
         <h2>{this.props.userName}</h2>
          <AccountBalance accountBalance={this.props.accountBalance}/>
          {/* Make a form, which uses handleSubmit to access the props functions from App.js */}  
           <form onSubmit={this.handleSubmit}>
             <input 
             type="text" 
             name="description"
             placeholder='Description' // Add a placeholder that tells the user what to input
             value={this.state.description} // Keep the value in state
             onChange={this.handleChange} // Change state when the value changes
             />
             <input 
             type="float" 
             name="amount"
             placeholder='Amount'
             value={this.state.amount}
             onChange={this.handleChange}  
             />
             <button type="submit">Add Credit</button>
           </form>

          <ul> 
            {this.creditsView()} 
            {/* Must put this function within a list, as it only returns list items */}
          </ul>

           <Link to="/">Return to Home</Link>
    	</div>
    );
  }
}
export default Credits;