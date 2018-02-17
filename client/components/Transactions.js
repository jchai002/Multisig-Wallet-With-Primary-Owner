import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions, confirmTransaction } from "app/actions/transactions";
import moment from "moment";
import { Link } from "react-router";
import _ from "lodash";

@connect(({ transactions, account }) => ({ transactions, account }), {
  getTransactions,
  confirmTransaction
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
      const {
        transactionId,
        dateSubmitted,
        dateConfirmed,
        confirmedBy,
        confirmed
      } = transaction;
      const currentAccountAddress = this.props.account.address;
      var button = (
        <button className="btn btn-primary disabled" disabled>
          N/A
        </button>
      );
      if (!confirmed) {
        if (_.includes(confirmedBy, currentAccountAddress)) {
          button = (
            <button
              className="btn btn-primary"
              onClick={() => this.props.confirmTransaction(transactionId)}
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

      var confirmationStatus = confirmed ? "Yes" : "No";

      var confirmedByDisplay = [];
      confirmedBy.map(addr => {
        if (addr === currentAccountAddress) {
          confirmedByDisplay.push("current account");
        } else {
          confirmedByDisplay.push(addr.substr(addr.length - 6));
        }
      });

      return (
        <div key={transactionId} className="row table-row">
          <div className="col-12 col-lg-1">{transactionId}</div>
          <div className="col-12 col-lg-2">
            {moment(dateSubmitted).format("DD MMM YYYY")}
          </div>
          <div className="col-12 col-lg-2">
            {dateConfirmed
              ? moment(dateConfirmed).format("DD MMM YYYY")
              : "N/A"}
          </div>
          <div className="col-12 col-lg-3">{confirmedByDisplay.join(", ")}</div>
          <div className="col-12 col-lg-2">{confirmationStatus}</div>
          <div className="col-12 col-lg-1">{button}</div>
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
            <div className="col-12 col-lg-2">Date Submitted</div>
            <div className="col-12 col-lg-2">Date Confirmed</div>
            <div className="col-12 col-lg-3">Confirmed By</div>
            <div className="col-12 col-lg-2">Confirmed?</div>
            <div className="col-12 col-lg-1">Action</div>
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
