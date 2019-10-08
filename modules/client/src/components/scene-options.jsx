import "./scene-options.scss";

import React from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";

import { makePerformanceSelector } from "../store/selectors";

export default function SceneOptions({ match: { params } }) {
  const { scene } = useSelector(makePerformanceSelector(params));
  const { sceneId } = params;
  const { options } = scene;

  return (
    <div className="scene-options">
      <h2>{`Scene ${sceneId} options`}</h2>
      <ReactJson src={options} />
    </div>
  );
}
