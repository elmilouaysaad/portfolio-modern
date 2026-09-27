import React from "react";
import ReactDOM from "react-dom/client";
import ColorModeProvider from "./context/ColorModeProvider";
import App from "./App";
import "./index.css";

class ErrorBoundary extends React.Component {
  state = { error: null };
  componentDidCatch(error) { console.error("Caught:", error); this.setState({ error }); }
  render() {
    if (this.state.error) return <pre style={{ padding: 20 }}>{String(this.state.error?.stack || this.state.error)}</pre>;
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ColorModeProvider>
  </React.StrictMode>
);
