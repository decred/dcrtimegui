import React, { Component } from "react";
import { Message } from "pi-ui";

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
      <Message kind="error">{error.toString()}</Message>
    ) : (
      this.props.children
    );
  }
}
