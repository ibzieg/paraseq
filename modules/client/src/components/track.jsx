import "./scene-options.scss";

import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { NavLink, Redirect } from "react-router-dom";

import { makePerformanceSelector } from "../store/selectors";
import NavButton from "./nav-button";
import SectionBox from "./section-box";
import TrackOptions from "./track-options";
import TrackSequenceData from "./track-sequence-data";

export default function Track({ match: { params } }) {
  const { perfId, sceneId, trackId } = params;
  const { track } = useSelector(makePerformanceSelector(params));
  const { name } = track;

  return (
    <SectionBox title={name}>
      <div className="track-tab-container">
        <NavButton
          text="OPTIONS"
          route={`/performances/${perfId}/scene/${sceneId}/track/${trackId}/options`}
        />
        <NavButton
          text="SEQUENCE DATA"
          route={`/performances/${perfId}/scene/${sceneId}/track/${trackId}/sequences`}
        />
      </div>
      <div>
        <Switch>
          <Route
            path="/performances/:perfId/scene/:sceneId/track/:trackId/options"
            component={TrackOptions}
          />
          <Route
            path="/performances/:perfId/scene/:sceneId/track/:trackId/sequences"
            component={TrackSequenceData}
          />
          <Redirect
            from="/performances/:perfId/scene/:sceneId/track/:trackId"
            to="/performances/:perfId/scene/:sceneId/track/:trackId/sequences"
          />
        </Switch>
      </div>
    </SectionBox>
  );
}
