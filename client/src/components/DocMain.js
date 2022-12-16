import React from 'react';
import './DocMain.scss';

const DocMain = () => {
  return (
    <main class="doc-main">
      <section class="inner-main">
        <h2 class="screen_out">채용 데모 페이지 본문</h2>
        <div class="main-content">
          <article id="mainContent" class="content-article">
            <h3 class="screen_out">채용 목록</h3>
            <ul class="list_job">
              <li class="new">
                <div class="title_job">
                  <a href="#none" class="link_title">
                    <strong>
                      프론트엔드 개발자<em>FT팀</em>
                    </strong>
                  </a>
                  <span class="bundle_badge">
                    <a href="#none">WEB DEVELOPMENT</a>
                    <a href="#none">REACT</a>
                    <a href="#none">VUE</a>
                    <a href="#none">ES6</a>
                  </span>
                </div>
                <div class="desc_job">
                  <span class="badge_type">Front-end</span>
                  <div class="wrap_txt">
                    <span class="txt_day">Today</span>
                    <span class="txt_location">제주</span>
                  </div>
                </div>
              </li>
              <li class="new">
                <div class="title_job">
                  <a href="#none" class="link_title">
                    <strong>
                      웹 디자이너<em>UX팀</em>
                    </strong>
                  </a>
                  <span class="bundle_badge">
                    <a href="#none">UX</a>
                    <a href="#none">UI</a>
                    <a href="#none">SKETCH APP</a>
                    <a href="#none">ZEPLIN</a>
                    <a href="#none">ILLUSTRATOR</a>
                    <a href="#none">PHOTOSHOP</a>
                  </span>
                </div>
                <div class="desc_job">
                  <span class="badge_type">Design</span>
                  <div class="wrap_txt">
                    <span class="txt_day">2 days ago</span>
                    <span class="txt_location">판교</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title_job">
                  <a href="#none" class="link_title">
                    <strong>
                      UI 개발자<em>FT3팀</em>
                    </strong>
                  </a>
                  <span class="bundle_badge">
                    <a href="#none">WEB DEVELOPMENT</a>
                    <a href="#none">SCSS</a>
                    <a href="#none">HTML5</a>
                  </span>
                </div>
                <div class="desc_job">
                  <span class="badge_type">Front-end</span>
                  <div class="wrap_txt">
                    <span class="txt_day">2021.08.01</span>
                    <span class="txt_location">가산</span>
                  </div>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
};

export default DocMain;
