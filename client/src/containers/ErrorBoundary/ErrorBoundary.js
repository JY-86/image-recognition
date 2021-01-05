import React from 'react';
import 'tachyons';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1 className="tc b red">{this.props.text === undefined ? "Something went wrong. Please try again later" : this.props.text}</h1>;
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;