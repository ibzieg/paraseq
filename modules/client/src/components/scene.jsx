import "./scene.scss";

import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

import { makePerformanceSelector } from "../store/selectors";
import NavButton from "./nav-button";
import TrackSummary from "./track-summary";

export default function SceneView({ location }) {
  const { perfId, sceneId, trackId } = location;
  const { performance, scene } = useSelector(makePerformanceSelector(location));
  const tracks = get(scene, "tracks", []);
  const w = `${100.0 / (tracks.length + 1)}%`;

  return (
    <div className="scene-container">
      {tracks.map((track, i) => {
        return (
          <NavButton
            key={i}
            style={{ width: w, maxWidth: w }}
            active={trackId === i}
            selected={
              sceneId - 1 === performance.selectedScene &&
              performance.selectedTrack === i
            }
            route={`/performances/${perfId}/scene/${sceneId}/track/${i + 1}/`}
            text={
              <TrackSummary index={i} first={sceneId === 1} track={track} />
            }
          />
        );
      })}
    </div>
  );
}
