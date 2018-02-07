import React, { Component } from "react";
import { connect } from "react-redux";
import { submitTransaction } from "app/actions/transactions";

@connect(
  ({ transactions }) => ({
    transactions
  }),
  { submitTransaction }
)
export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7",
      amount: "1"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var { destination, amount } = this.state;
    this.props.submitTransaction(destination, amount);
  }

  render() {
    return (
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
            type="number"
            className="form-control"
            onChange={e => {
              this.setState({ amount: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="form-control btn btn-primary"
            placeholder="Send Ether"
          />
        </div>
      </form>
    );
  }
}
