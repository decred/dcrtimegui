import React, { Component } from "react";
import { Message } from "cobra";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }

  render() {
    const { error } = this.state;
    return error ? (
      <Message type="error" text={error.toString()} />
    ) : (
      this.props.children
    );
  }
}
