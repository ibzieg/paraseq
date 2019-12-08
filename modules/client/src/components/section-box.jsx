import "./section-box.scss";

import React from "react";

export default function SectionBox({ title, children }) {
  return (
    <div className="section-box">
      <div className="section-box-header">
        <h2>{title}</h2>
      </div>
      <div className="section-box-content">{children}</div>
    </div>
  );
}
