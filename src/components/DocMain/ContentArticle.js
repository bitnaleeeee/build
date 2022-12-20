import React from "react";
import JobItem from "../DocMain/JobItem";
import "./ContentArticle.scss";

const ContentArticle = (props) => {
  const { jobList, searchStr } = props;
  return (
    <article id="mainContent" className="content-article">
      <h3 className="screen_out">채용 목록</h3>
      <ul className="list_job">
        {jobList.length ? (
          jobList.map((item, idx) => {
            return <JobItem key={idx} JobData={item} searchStr={searchStr} />;
          })
        ) : (
          <li className="none-item">검색 결과가 없습니다.</li>
        )}
      </ul>
    </article>
  );
};
export default ContentArticle;
