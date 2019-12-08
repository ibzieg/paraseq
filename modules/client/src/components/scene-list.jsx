import "./performance.scss";
import "./scene-list.scss";

import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";

import { makePerformanceSelector } from "../store/selectors";
import NavButton from "./nav-button";
import Scene from "./scene";

export default function SceneList({ perfId }) {
  const { performance } = useSelector(makePerformanceSelector({ perfId }));
  const scenes = get(performance, "scenes", []);

  return (
    <div className="scene-list-container">
      {scenes.map((value, index) => (
        <div className="performance-tab-wrapper">
          <NavButton
            key={index}
            selected={performance.selectedScene === index}
            route={`/performances/${perfId}/scene/${index + 1}`}
            text={`SCENE ${index + 1}`}
          />
          <Route
            path="/"
            location={{
              ...location,
              perfId: perfId,
              sceneId: index + 1
            }}
            component={Scene}
          />
        </div>
      ))}
    </div>
  );
}
