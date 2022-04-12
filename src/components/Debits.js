// src/components/Debits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
  constructor(props) { // Create and initialize state
    super(props); // Always do super()
    this.state = {
      description: "",
      amount: "",
    }
  }

  // List out the debit posts from the array from props onto the page
	// debitsView = () => {
  //     const { debits } = this.props.debits; // Grab from props the array
  //     return debits.map((debit) => { // Use map to list each debit item
  //         let date = debit.date.slice(0,10); // Get the first ten chars of the date
  //         // Give map a list item, with key using the id, which lists the other values
  //         return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
  //     }) 
  // }

  handleChange = (event) => {
    const {name, value, type, checked} = event.target
    // if the type just grabbed from the event is a checkbox, set the name of the event, 
    // which is named after an element in the state - so the element in the state - to 
    // the boolean checked, otherwise set [name], in state, to the value grabbed. 
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }  

  // List out the debit posts from the array from props onto the page
	debitsView  = () => {
    const { debits } = this.props.debits; // Grab from props the array
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
    //this.props.updateId(); 
    this.props.addDebit(debit);
  }

  render() {
    return (
    	<div>
    	   <h1>Debits</h1>
         {/* this.debitView() is not working */}
    	   {this.debitsView} 
         {/* Use the above function to list debit items onto the page */}
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

           <Link to="/">Return to Home</Link>
    	</div>
    );
  }
}
export default Debits;