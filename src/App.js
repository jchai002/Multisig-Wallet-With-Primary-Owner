import React, { Component } from "react";
import "app/assets/styles/app.scss";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <main className="container">{this.props.children}</main>
      </div>
    );
  }
}
