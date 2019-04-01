import React, { Component } from "react";


import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ActionCreators from "../store/action-creators";
import { Switch, Route, Redirect } from "react-router";


import ReactJson from "react-json-view";

import "../styles/track.css";

const TrackSummary = ({ style, index, first, selected, track }) => (
  <div
    style={{ ...style }}
    className="track-summary"
  >
    { first
      ?
      <h4
        style={{
          flex: 1,
          color: selected && first ? 'magenta' : 'inherit'
        }}
      >
        {`Track ${index+1}`}
      </h4>
      :
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        fontSize: 10
      }}>
        <ReactJson
          style={{}}
          src={track}
          name={null}
          indentWidth={2}
          shouldCollapse={(f) => {
            switch (f.name) {
              case "graphData":
              case "sequenceData":
                return true;
              default:
                return false;
            }
          }}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </div>
    }
  </div>
);

export default TrackSummary;
