import "./performance.scss";

import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import { makePerformanceSelector } from "../store/selectors";
import SceneList from "./scene-list";
import SceneOptions from "./scene-options";
import Track from "./track";

export default function Performance({ match: { params } }) {
  const { perfId } = params;
  const { performance } = useSelector(makePerformanceSelector(params));
  const { name } = performance;

  return (
    <div>
      {performance ? (
        <div>
          <div className="performance-header">
            <h3>{name}</h3>
          </div>
          <div className="performance-content">
            <SceneList perfId={perfId} />
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
