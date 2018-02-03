import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { initializeWeb3 } from "app/actions/web3Actions";
import { getWalletInfo } from "app/actions/walletActions";

export default function(ComposedComponent) {
  @connect(
    ({ web3, wallet }) => ({
      web3,
      wallet
    }),
    {
      initializeWeb3,
      getWalletInfo
    }
  )
  class HasWallet extends Component {
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
      if (nextProps.wallet.walletFound === null) {
        this.props.getWalletInfo();
      }
      if (nextProps.wallet.walletFound === false) {
        this.context.router.push("/missing-wallet");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return HasWallet;
}
