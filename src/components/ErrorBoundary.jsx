import React, { Component } from "react";
import { Message } from "pi-ui";
import Page from "src/components/Layout/Page";

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
      <Page>
        <Message kind="error">{error.toString()}</Message>
      </Page>
    ) : (
      this.props.children
    );
  }
}
