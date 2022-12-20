import React from "react";
import "./DocFooter.scss";

const DocFooter = () => {
  return (
    <footer className="doc-footer">
      <div className="inner_footer">
        <small>&copy; 2021 dktechin.com</small>
        <div className="area_link">
            <a target="_blank" href="https://dktechin.com/service/introduce/company" rel="noopener noreferrer">회사소개</a>
            <a target="_blank" href="https://dktechin.com/service/careers/process" rel="noopener noreferrer">채용절차</a>
            <a target="_blank" href="https://dktechin.com/service/careers/job" rel="noopener noreferrer">직무소개</a>
        </div>
      </div>
    </footer>
  );
};
export default DocFooter;
