import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { initializeWeb3 } from "app/actions/web3";
import { getWalletInfo } from "app/actions/wallet";

@connect(
  ({ web3, wallet }) => ({
    web3,
    wallet
  }),
  { initializeWeb3, getWalletInfo }
)
export default class MissingWallet extends Component {
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
    if (nextProps.wallet.walletFound === null) {
      this.props.getWalletInfo();
    }
    if (nextProps.wallet.walletFound) {
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
