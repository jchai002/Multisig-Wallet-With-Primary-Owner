import React, { Component } from "react";
import { connect } from "react-redux";
import { getWallet } from "app/util/contract";
import { getSettings } from "app/actions/settings";

@connect(
  ({ settings }) => ({
    settings
  }),
  { getSettings }
)
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getSettings();
  }

  render() {
    console.log(this.props.settings);
    // const wallet = await getWallet();
    // console.log(wallet);
    return (
      <div>
        <h1>Settings</h1>
        <div />
      </div>
    );
  }
}
