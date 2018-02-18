import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { initializeWeb3 } from "app/actions/web3";
import { getAccountInfo } from "app/actions/account";
import { getMultisigInfo } from "app/actions/multisig";
import { getSettings } from "app/actions/settings";
import { pollForAccountUpdate } from "app/util/polling";
import _ from "lodash";

export default function(ComposedComponent) {
  @connect(
    ({ web3, account, multisig, settings }) => ({
      web3,
      account,
      multisig,
      settings
    }),
    {
      initializeWeb3,
      getAccountInfo,
      getMultisigInfo,
      getSettings
    }
  )
  class HasAccount extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (!this.props.web3) {
        this.props.initializeWeb3();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.web3 || nextProps.account.accountFound === false) {
        this.context.router.push("/missing-account");
      }
      if (nextProps.account.accountFound === null) {
        this.props.getAccountInfo();
      }
      if (nextProps.multisig.contractFound === null) {
        this.props.getMultisigInfo();
      }
      if (nextProps.settings === null) {
        this.props.getSettings();
      }
      if (
        nextProps.settings &&
        !_.includes(nextProps.settings.owners, nextProps.account.address)
      ) {
        this.context.router.push("/unauthorized");
      }
      pollForAccountUpdate();
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return HasAccount;
}
