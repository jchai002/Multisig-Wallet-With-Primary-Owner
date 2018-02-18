import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTransactions,
  confirmTransaction,
  revokeConfirmation
} from "app/actions/transactions";
import moment from "moment";
import { Link } from "react-router";
import _ from "lodash";

@connect(({ transactions, account }) => ({ transactions, account }), {
  getTransactions,
  confirmTransaction,
  revokeConfirmation
})
export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: ""
    };
  }

  componentWillMount() {
    var { page } = this.props.routeParams;
    page = page || "1";
    this.props.getTransactions(page);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.page !== nextProps.routeParams.page) {
      var { page } = nextProps.routeParams;
      this.props.getTransactions(page);
    }
  }

  renderTransactions() {
    return this.props.transactions.transactionsOnPage.map(transaction => {
      console.log(transaction);
      const {
        transactionId,
        destination,
        amount,
        dateSubmitted,
        dateExecuted,
        confirmedBy,
        executed
      } = transaction;
      const currentAccountAddress = this.props.account.address;
      var button = (
        <button className="btn btn-primary disabled" disabled>
          N/A
        </button>
      );
      if (!executed) {
        if (_.includes(confirmedBy, currentAccountAddress)) {
          button = (
            <button
              className="btn btn-primary"
              onClick={() => this.props.revokeConfirmation(transactionId)}
            >
              Revoke
            </button>
          );
        } else {
          button = (
            <button
              className="btn btn-primary"
              onClick={() => this.props.confirmTransaction(transactionId)}
            >
              Confirm
            </button>
          );
        }
      }

      var executionStatus = executed ? "Executed" : "Pending";

      return (
        <div key={transactionId} className="row table-row">
          <div className="col-12 col-lg-1">{transactionId}</div>
          <div className="col-12 col-lg-1">{amount}</div>
          <div className="col-12 col-lg-6">{destination}</div>
          <div className="col-12 col-lg-1">{executionStatus}</div>
          <div className="col-12 col-lg-2">{button}</div>
          <div className="col-12 col-lg-1">Details</div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.transactions) return null;
    const pageNumber = Number(this.props.transactions.pageNumber);
    const totalPages = Number(this.props.transactions.totalPages);
    return (
      <div className="transactions-page page-wrapper">
        <h2>Transactions</h2>
        <div className="table-header">
          <div className="row">
            <div className="col-12 col-lg-1">Tx ID</div>
            <div className="col-12 col-lg-1">Amount</div>
            <div className="col-12 col-lg-6">Destination</div>
            <div className="col-12 col-lg-1">Status</div>
            <div className="col-12 col-lg-2">Action</div>
            <div className="col-12 col-lg-1">Details</div>
          </div>
        </div>
        <div className="table-body">
          <div className="transactions">{this.renderTransactions()}</div>
        </div>
        <div className="table-footer">
          <Link
            className={pageNumber === 1 ? "disabled" : ""}
            to={"/transactions/" + String(pageNumber - 1)}
          >
            {"< Newer"}
          </Link>
          <Link
            className={pageNumber === totalPages ? "disabled" : ""}
            to={"/transactions/" + String(pageNumber + 1)}
          >
            {"Older >"}
          </Link>
        </div>
      </div>
    );
  }
}
