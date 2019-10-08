import "./scene.scss";

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import SceneSummary from "./scene-summary";
import TrackSummary from "./track-summary";

export default function SceneView({ location }) {
  const sequencerDefinition = useSelector(state => state.sequencerDefinition);

  const performanceId = parseInt(location.performanceId) - 1;
  const sceneId = location.sceneId;

  const performance = sequencerDefinition.performances[performanceId];
  const scene = performance ? performance.scenes[sceneId] : {};

  const options = scene ? scene.options : {};

  const tracks = scene ? scene.tracks : [];

  const w = `${100.0 / (tracks.length + 1)}%`;

  return (
    <div className="scene-container">
      {/*<SceneSummary style={{ width: w }} options={options} />*/}
      {tracks.map((track, i) => {
        return (
          <NavLink
            key={i}
            style={{ width: w }}
            className="scene-summary color-tone1"
            to={`/performances/${performanceId + 1}/scene/${sceneId +
              1}/track/${i + 1}/`}
            activeClassName="scene-summary-route color-white"
          >
            <TrackSummary
              index={i}
              selected={performance.selectedTrack === i}
              first={sceneId === 0}
              track={track}
            />
          </NavLink>
        );
      })}
    </div>
  );
}
