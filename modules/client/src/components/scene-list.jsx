import "./performance.scss";

import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { NavLink } from "react-router-dom";

import { makePerformanceSelector } from "../store/selectors";
import Scene from "./scene";

export default function SceneList({ perfId }) {
  const { performance } = useSelector(makePerformanceSelector({ perfId }));
  const scenes = get(performance, "scenes", []);

  return (
    <div className="performance-tabs-container">
      {scenes.map((value, index) => (
        <div className="performance-tab-wrapper">
          <NavLink
            key={index}
            className="performance-tab color-tone1"
            to={`/performances/${perfId}/scene/${index + 1}`}
            activeClassName="performance-tab-route color-white"
          >
            <h3
              style={{
                color:
                  performance.selectedScene === index ? "magenta" : undefined
              }}
            >
              {`SCENE ${index + 1}`}
            </h3>
          </NavLink>
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
