import { Component } from "react";
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: "#C71585" }}>Something went wrong: {this.state.error?.message || "Unknown error"}</div>;
    }
    return this.props.children;
  }
}