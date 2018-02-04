import React, { Component } from "react";
import { connect } from "react-redux";
import { sendEther } from "app/actions/transaction";

@connect(
  ({ transactions }) => ({
    transactions
  }),
  { sendEther }
)
export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = { destination: "", amount: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var { destination, amount } = this.state;
    this.props.sendEther(destination, amount);
  }

  render() {
    console.log(this.state);
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
