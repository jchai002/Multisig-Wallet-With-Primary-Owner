import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { initializeWeb3 } from "app/actions/web3";
import { getAccountInfo } from "app/actions/account";

@connect(
  ({ web3, account }) => ({
    web3,
    account
  }),
  { initializeWeb3, getAccountInfo }
)
export default class MissingAccount extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if (!this.props.web3) {
      this.props.initializeWeb3();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.account.accountFound === null) {
      this.props.getAccountInfo();
    }
    if (nextProps.account.accountFound) {
      this.context.router.push("/");
    }
  }

  render() {
    return (
      <div className="unauthenticated">
        <p>
          Please login with{" "}
          <a className="link" href="https://metamask.io/">
            MetaMask
          </a>
        </p>
      </div>
    );
  }
}