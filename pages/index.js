import Router from "next/router";
import React, { Component } from "react";

export default class Index extends Component {
  componentDidMount = () => {
    Router.push("/landing");
  };

  render() {
    return <div />;
  }
}
