import { Component, ErrorInfo, ReactNode } from "react";
import ErrorPage from "@pages/ErrorPage";

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Unhandled error caught by ErrorBoundary", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage message={this.state.message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
