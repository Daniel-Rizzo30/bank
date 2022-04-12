// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div className="balance">
          Balance: {this.props.accountBalance}
        </div>
    );
  }
}

export default AccountBalance;