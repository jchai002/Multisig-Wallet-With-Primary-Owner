import React, { Component } from "react";
import { connect } from "react-redux";
import { getWalletInfo } from "../../actions/wallet";

@connect(({ wallet }) => ({ wallet }), { getWalletInfo })
export default class Header extends Component {
  render() {
    var etherBalance = this.props.wallet.etherBalance
      ? this.props.wallet.etherBalance.toFixed(3)
      : 0;
    return (
      <header>
        <div className="nav-desktop">
          <div className="logo">
            <h1>Multisig</h1>
          </div>
          <div className="wallet">
            <p>
              <span>Wallet Address:</span>
              <span className="address">{this.props.wallet.address}</span>
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
