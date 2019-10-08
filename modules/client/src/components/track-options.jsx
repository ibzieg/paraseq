import "./scene-options.scss";

import React from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";

export default function TrackOptions({ match }) {
  const sequencerDefinition = useSelector(state => state.sequencerDefinition);

  const trackId = parseInt(match.params.trackId) - 1;

  const performance =
    sequencerDefinition.performances[parseInt(match.params.perfId) - 1];
  const scene = performance
    ? performance.scenes[parseInt(match.params.sceneId) - 1]
    : {};
  const track = scene && scene.tracks ? scene.tracks[trackId] : {};

  return (
    <div className="track-options">
      <ReactJson src={track} />
    </div>
  );
}
