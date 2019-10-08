import "./performance.scss";

import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import { makePerformanceSelector } from "../store/selectors";
import SceneList from "./scene-list";
import SceneOptions from "./scene-options";
import Track from "./track";

export default function Performance({ location, match: { params } }) {
  const { perfId } = params;
  const { performance } = useSelector(makePerformanceSelector(params));

  return (
    <div>
      {performance ? (
        <div>
          <div className="performance-header">{performance["name"]}</div>
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
