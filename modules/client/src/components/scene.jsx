import "./scene.scss";

import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { makePerformanceSelector } from "../store/selectors";
import TrackSummary from "./track-summary";

export default function SceneView({ location }) {
  const { perfId, sceneId } = location;
  const { performance, scene } = useSelector(makePerformanceSelector(location));
  const tracks = get(scene, "tracks", []);
  const w = `${100.0 / (tracks.length + 1)}%`;

  return (
    <div className="scene-container">
      {tracks.map((track, i) => {
        return (
          <NavLink
            key={i}
            style={{ width: w }}
            className="scene-summary color-tone1"
            to={`/performances/${perfId}/scene/${sceneId}/track/${i + 1}/`}
            activeClassName="scene-summary-route color-white"
          >
            <TrackSummary
              index={i}
              selected={performance.selectedTrack === i}
              first={sceneId === 1}
              track={track}
            />
          </NavLink>
        );
      })}
    </div>
  );
}
