import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { initializeWeb3 } from "app/actions/web3Actions";
import { getWalletInfo } from "app/actions/walletActions";

export default function(ComposedComponent) {
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
        this.props.initializeWeb3();
      }
      if (!nextProps.wallet.address) {
        // only get wallet if not logged in
        return this.props.getWalletInfo();
      }
    }

    render() {
      console.log("comp", this.props);
      if (!this.props.web3) {
        // if web3 not found
        return (
          <div className="unauthenticated">
            <p>
              This Dapp requires the{" "}
              <a className="link" href="https://metamask.io/">
                MetaMask
              </a>{" "}
              Chrome extension. You can{" "}
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                className="link"
              >
                download it here
              </a>.
            </p>
          </div>
        );
      } else if (!this.props.wallet.address) {
        // if wallet address not found
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
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  return connect(
    ({ web3, wallet }) => ({
      web3,
      wallet
    }),
    {
      initializeWeb3,
      getWalletInfo
    }
  )(HasWallet);
}
