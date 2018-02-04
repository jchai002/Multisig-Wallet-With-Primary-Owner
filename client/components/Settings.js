import React, { Component } from "react";
import { connect } from "react-redux";
import { getWallet } from "app/util/contract";
import { getSettings } from "app/actions/settings";

@connect(
  ({ web3, settings }) => ({
    web3,
    settings
  }),
  { getSettings }
)
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(nextProps) {
    if (nextProps.web3 && !this.props.settings) {
      this.props.getSettings();
    }
  }

  renderOwners() {
    const { owners, primaryOwner } = this.props.settings;
    return owners.map(owner => {
      var cssClass = owner == primaryOwner ? "owner primary" : "owner";
      return (
        <div key={owner} className={cssClass}>
          {owner}
        </div>
      );
    });
  }

  render() {
    console.log(this.props.settings);

    if (!this.props.settings) {
      return null;
    }
    return (
      <div>
        <h1>Settings</h1>
        <div className="owners">{this.renderOwners()}</div>
      </div>
    );
  }
}
