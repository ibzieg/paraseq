import "./scene.scss";

import React, { Component } from "react";

export default class SceneSummary extends Component {
  render() {
    return (
      <div style={{ ...this.props.style }} className="scene-summary">
        <h4>{`${this.props.options.root ? this.props.options.root : "-"}`}</h4>
      </div>
    );
  }
}
