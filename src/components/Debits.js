// src/components/Debits.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component {
	debitsView = () => {
        const { debits } = this.props;
        return debits.map((debit) => {
            let date = debit.date.slice(0,10);
            return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
        }) 
    }
  render() {
    return (
    	<div>
    	   <h1>Debits</h1>
    	   {this.debitsView()}
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