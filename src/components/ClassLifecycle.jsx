import { Component } from "react";

class ClassLifecycle extends Component {
  componentDidMount() {
    console.log("Lifecycle component mounted");
  }

  render() {
    return (
      <p style={{ marginTop: "20px", fontSize: "12px", color: "var(--muted-text)" }}>
        Class Lifecycle Component Loaded
      </p>
    );
  }
}

export default ClassLifecycle;
