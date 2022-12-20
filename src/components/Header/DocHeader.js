import React from "react";
import "./DocHeader.scss";

const DocHeader = () => {
  return (
    <header className="doc-header">
      <div className="main_tit">
        <div className="inner_main">
          <h1 className="doc-title">
            <a href="#none">DK Jobs</a>
          </h1>
        </div>
      </div>
    </header>
  );
};
export default DocHeader;
