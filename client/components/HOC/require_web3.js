import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { initializeWeb3 } from "app/actions/web3";
import { getAccountInfo } from "app/actions/account";
import { getMultisigInfo } from "app/actions/multisig";
import { pollForAccountUpdate } from "app/util/polling";

export default function(ComposedComponent) {
  @connect(
    ({ web3, account, multisig }) => ({
      web3,
      account,
      multisig
    }),
    {
      initializeWeb3,
      getAccountInfo,
      getMultisigInfo
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
        return this.context.router.push("/missing-account");
      }
      if (nextProps.account.accountFound === null) {
        return this.props.getAccountInfo();
      }
      if (nextProps.multisig.contractFound === null) {
        return this.props.getMultisigInfo();
      }
      pollForAccountUpdate();
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return HasAccount;
}
