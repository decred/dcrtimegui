import React, { Component } from "react";

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
            <div>{error.toString()}</div>
        ) : (
            this.props.children
        );
    }
}
