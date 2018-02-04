import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { initializeWeb3 } from "app/actions/web3";
import { getAccountInfo } from "app/actions/account";

export default function(ComposedComponent) {
  @connect(
    ({ web3, account }) => ({
      web3,
      account
    }),
    {
      initializeWeb3,
      getAccountInfo
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
      if (!nextProps.web3) {
        this.context.router.push("/missing-web3");
      }
      if (nextProps.account.accountFound === null) {
        this.props.getAccountInfo();
      }
      if (nextProps.account.accountFound === false) {
        this.context.router.push("/missing-account");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return HasAccount;
}
