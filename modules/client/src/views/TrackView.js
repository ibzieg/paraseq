import "../styles/scene-options.css";

import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";

import TrackOptions from "../components/TrackOptions";
import TrackSequenceData from "../components/TrackSequenceData";

export default function TrackView({ match }) {
  const sequencerDefinition = useSelector(state => state.sequencerDefinition);
  const trackId = parseInt(match.params.trackId) - 1;

  const performance =
    sequencerDefinition.performances[parseInt(match.params.perfId) - 1];

  const scene = performance
    ? performance.scenes[parseInt(match.params.sceneId) - 1]
    : {};
  const track = scene && scene.tracks ? scene.tracks[trackId] : {};

  const { params } = match;

  return (
    <div>
      <div>
        <h2>{`Track ${params.trackId}`}</h2>
      </div>
      <div className="track-tab-container">
        <NavLink
          className="track-tab color-tone1"
          to={`/performances/${params.perfId}/scene/${params.sceneId}/track/${
            params.trackId
          }/options`}
          activeClassName="track-tab-route color-white"
        >
          <h3>OPTIONS</h3>
        </NavLink>
        <NavLink
          className="track-tab color-tone1"
          to={`/performances/${params.perfId}/scene/${params.sceneId}/track/${
            params.trackId
          }/`}
          activeClassName="track-tab-route color-white"
        >
          <h3>SEQUENCE DATA</h3>
        </NavLink>
      </div>
      <div>
        <Switch>
          <Switch>
            <Route
              path="/performances/:perfId/scene/:sceneId/track/:trackId/options"
              component={TrackOptions}
            />
            <Route
              path="/performances/:perfId/scene/:sceneId/track/:trackId"
              component={TrackSequenceData}
            />
          </Switch>
        </Switch>
      </div>
    </div>
  );
}
