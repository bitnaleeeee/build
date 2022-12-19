import React from 'react';
import ContentArticle from './ContentArticle';
import './DocMain.scss';

const DocMain = props => {
  const { jobList } = props;
  return (
    <main className="doc-main">
      <section className="inner-main">
        <h2 className="screen_out">채용 데모 페이지 본문</h2>
        <div className="main-content">
          <ContentArticle jobList={jobList} />
        </div>
      </section>
    </main>
  );
};
export default DocMain;
