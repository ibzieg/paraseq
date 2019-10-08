import "./performance.scss";

import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";

import Scene from "./scene";
import SceneOptions from "./scene-options";
import Track from "./track";

export default function Performance({ match, location }) {
  const sequencerDefinition = useSelector(state => state.sequencerDefinition);
  const performance =
    match.params.id >= 1
      ? sequencerDefinition.performances[parseInt(match.params.id) - 1]
      : {};

  return (
    <div>
      {performance ? (
        <div>
          <div className="performance-header">{performance["name"]}</div>
          <div className="performance-content">
            <div className="performance-tabs-container">
              {performance.scenes.map((value, index) => (
                <div className="performance-tab-wrapper">
                  <NavLink
                    key={index}
                    className="performance-tab color-tone1"
                    to={`/performances/${match.params.id}/scene/${index + 1}`}
                    activeClassName="performance-tab-route color-white"
                  >
                    <h3
                      style={{
                        color:
                          performance.selectedScene === index
                            ? "magenta"
                            : undefined
                      }}
                    >
                      {`SCENE ${index + 1}`}
                    </h3>
                  </NavLink>
                  <Route
                    path="/"
                    location={{
                      ...location,
                      performanceId: match.params.id,
                      sceneId: index
                    }}
                    component={Scene}
                  />
                </div>
              ))}
            </div>
            <div className="performance-content-detail">
              <Switch>
                <Route
                  path="/performances/:perfId/scene/:sceneId/track/:trackId"
                  component={Track}
                />
                <Route
                  path="/performances/:perfId/scene/:sceneId"
                  component={SceneOptions}
                />
                <Redirect exact={true} from="/" to="/performances/1/scene/1" />
                <Redirect
                  exact={true}
                  from="/performances"
                  to="/performances/1/scene/1"
                />
              </Switch>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
