import React from "react";
import { useSelector } from "react-redux";

export default function ConnectionStatus({ connect }) {
  const isConnected = useSelector(state => state.wsConnected);

  const indicator = isConnected ? (
    <h2 className="color-success">✔connected</h2>
  ) : (
    <span>
      <h2 className="color-error">✘disconnected</h2>
      <button onClick={connect}>Connect</button>
    </span>
  );

  return (
    <div>
      <div>{indicator}</div>
    </div>
  );
}
