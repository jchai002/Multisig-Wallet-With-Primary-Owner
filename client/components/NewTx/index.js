import React, { Component } from "react";
import { connect } from "react-redux";
import { submitTransaction } from "app/actions/transactions";
import EthLogo from "app/assets/images/eth.png";
import { BLOCK_PENDING } from "app/constants/ActionTypes";

@connect(
  ({ transactions, block }) => ({
    transactions,
    block
  }),
  { submitTransaction }
)
export default class Multisig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      amount: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var { destination, amount } = this.state;
    this.props.submitTransaction(destination, amount);
  }

  render() {
    const indicator =
      this.props.block === BLOCK_PENDING ? (
        <img
          className="eth-logo animated infinite pulse"
          src={EthLogo}
          role="presentation"
        />
      ) : null;
    return (
      <div className="new-tx-page page-wrapper">
        <h2>Submit New Transaction {indicator}</h2>
        <div className="content-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                className="form-control"
                placeholder="0x0..."
                onChange={e => {
                  this.setState({ destination: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="text"
                className="form-control"
                onChange={e => {
                  this.setState({ amount: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className={`btn btn-primary ${
                  this.props.block === BLOCK_PENDING ? "disabled" : ""
                }`}
                placeholder="Send Ether"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
