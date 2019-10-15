import "./track.scss";

import React from "react";

export default function TrackSummary({ index, first, track }) {
  const changedProps = Object.keys(track);
  const changedPropsCount = changedProps.length;
  const { name } = track;

  return first ? (
    <h4>{name}</h4>
  ) : (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        overflow: "hidden",
        textOverflow: "ellipsis",
        alignChildren: "center",
        fontSize: 10
      }}
    >
      <h4>{changedPropsCount > 0 ? `Δ${changedPropsCount}` : "{}"}</h4>
      <h4>{changedProps.toString()}</h4>
    </span>
  );
}
