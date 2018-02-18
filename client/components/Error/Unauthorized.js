import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { pollForAccountUpdate } from "app/util/polling";
import { initializeWeb3 } from "app/actions/web3";
import { getSettings } from "app/actions/settings";
import { getAccountInfo } from "app/actions/account";
import Footer from "app/components/Layout/Footer";
import _ from "lodash";

@connect(({ web3, account, settings }) => ({ web3, account, settings }), {
  initializeWeb3,
  getSettings,
  getAccountInfo
})
export default class Unauthorized extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if (!this.props.web3) {
      this.props.initializeWeb3();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.web3) {
      pollForAccountUpdate();
    }
    if (nextProps.account.accountFound === null) {
      this.props.getAccountInfo();
    }
    if (nextProps.settings === null) {
      this.props.getSettings();
    }
    if (
      nextProps.settings &&
      _.includes(nextProps.settings.owners, nextProps.account.address)
    ) {
      this.context.router.push("/");
    }
  }
  render() {
    return (
      <div className="unauthenticated">
        <main className="page-wrapper">
          <p>
            The current account is not authorized to use the multisig wallet
          </p>
        </main>
        <Footer />
      </div>
    );
  }
}
