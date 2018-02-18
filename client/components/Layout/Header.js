import React, { Component } from "react";
import { connect } from "react-redux";
import { getMultisigTruffleInfo } from "../../actions/multisig";
import { Link } from "react-router";

@connect(({ multisig }) => ({ multisig }), null)
export default class Header extends Component {
  render() {
    var etherBalance = this.props.multisig.etherBalance
      ? this.props.multisig.etherBalance.toFixed(3)
      : 0;
    return (
      <header>
        <div className="nav-desktop">
          <div className="info">
            <div className="logo">
              <h5>
                <Link to={"/"}>Multisig</Link>
              </h5>
            </div>
            <div className="info">
              <p>
                <span>Contract Address:</span>
                <span className="address">{this.props.multisig.address}</span>
              </p>
              <p>
                ETH: <span className="amount">{etherBalance}</span>
              </p>
            </div>
          </div>
          <div className="menu">
            <Link to="/">NewTx</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
      </header>
    );
  }
}
