import "./scene-options.scss";

import React from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";

import TrackOptions from "./track-options";
import TrackSequenceData from "./track-sequence-data";

export default function Track({ match: { params } }) {
  const { perfId, sceneId, trackId } = params;

  return (
    <div>
      <div>
        <h2>{`Track ${trackId}`}</h2>
      </div>
      <div className="track-tab-container">
        <NavLink
          className="track-tab color-tone1"
          to={`/performances/${perfId}/scene/${sceneId}/track/${trackId}/options`}
          activeClassName="track-tab-route color-white"
        >
          <h3>OPTIONS</h3>
        </NavLink>
        <NavLink
          className="track-tab color-tone1"
          to={`/performances/${perfId}/scene/${sceneId}/track/${trackId}/`}
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
