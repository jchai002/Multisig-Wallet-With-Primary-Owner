import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions, confirmTransaction } from "app/actions/transactions";
import moment from "moment";

@connect(({ transactions }) => ({ transactions }), {
  getTransactions,
  confirmTransaction
})
export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var { page } = this.props.routeParams;
    page = page || "1";
    this.props.getTransactions(page);
  }

  renderTransactions() {
    console.log(this.props.transactions);
    return this.props.transactions.transactionsOnPage.map(transaction => {
      const {
        transactionId,
        dateSubmitted,
        confirmedBy,
        confirmed
      } = transaction;

      var button;
      if (!confirmed) {
        button = (
          <button
            className="btn btn-primary"
            onClick={() => this.props.confirmTransaction(transactionId)}
          >
            Confirm
          </button>
        );
      } else {
        button = (
          <button className="btn btn-primary disabled" disabled>
            Confirmed
          </button>
        );
      }

      var confirmationStatus = confirmed ? "Yes" : "No";

      return (
        <div key={transactionId} className="row">
          <div className="col-12 col-lg-1">{transactionId}</div>
          <div className="col-12 col-lg-3">
            {moment(dateSubmitted).format("DD MMM YYYY")}
          </div>
          <div className="col-12 col-lg-6">{confirmedBy.join(",")}</div>
          <div className="col-12 col-lg-1">{confirmationStatus}</div>
          <div className="col-12 col-lg-1">{button}</div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.transactions) return null;
    return (
      <div>
        <h1>Transactions</h1>
        <div className="transactions">{this.renderTransactions()}</div>
      </div>
    );
  }
}
