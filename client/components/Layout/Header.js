import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccountInfo } from "../../actions/account";
import { Link } from "react-router";

@connect(({ account }) => ({ account }), { getAccountInfo })
export default class Header extends Component {
  render() {
    var etherBalance = this.props.account.etherBalance
      ? this.props.account.etherBalance.toFixed(3)
      : 0;
    return (
      <header>
        <div className="nav-desktop">
          <div className="logo">
            <h1>
              <Link to={"/"}>Multisig</Link>
            </h1>
          </div>
          <div className="account">
            <p>
              <span>Account Address:</span>
              <span className="address">{this.props.account.address}</span>
            </p>
          </div>
          <div className="balances">
            <p>
              ETH: <span className="amount">{etherBalance}</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}
