import React from 'react';
import './ContentArticle.scss';
import JobItem from './JobItem';

const ContentArticle = props => {
  const { jobList } = props;
  return (
    <article id="mainContent" class="content-article">
      <h3 class="screen_out">채용 목록</h3>
      <ul class="list_job">
        {jobList.map((item, idx) => {
          return <JobItem key={idx} jobData={item} />;
        })}
      </ul>
    </article>
  );
};

export default ContentArticle;
