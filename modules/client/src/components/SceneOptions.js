import "../styles/scene-options.css";

import React, { Component } from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";

export default function SceneOptions({ match }) {
  const sequencerDefinition = useSelector(state => state.sequencerDefinition);

  const performance =
    sequencerDefinition.performances[parseInt(match.params.perfId) - 1];

  const scene = performance
    ? performance.scenes[parseInt(match.params.sceneId) - 1]
    : {};

  const options = scene ? scene.options : {};

  return (
    <div className="scene-options">
      <h2>{`Scene ${match.params.sceneId} options`}</h2>
      <ReactJson src={options} />
    </div>
  );
}
