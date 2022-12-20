import React from "react";
import "./JobItem.scss";
const JobItem = (props) => {
  const {JobData, searchStr} = props;

  /**
   * 일수에 맞게 날짜 형식 변환
   * @param {string} dateStr 
   * @returns {string} dayResult
   */
  const dateFormat = (dateStr) => {
    
    let YYYYMMDD = dateStr.substr(0, 10);
    let todayCompare = getTodayCompare(YYYYMMDD);
    let dayResult = '';

    // 1일 안이면 Today
    if (todayCompare <= 0) {
      dayResult = 'Today';
    // 2일 내외면 1 ~ 2 days ago
    } else if (todayCompare <= 2) {
      dayResult = todayCompare + 'days ago';
    // 하이픈(-)은 점(.)으로 대치
    } else {
      dayResult = YYYYMMDD.replace(/-/gi, '.');
    }
    
    // 변환한 날짜 형식 반환
    return dayResult;
  }

  /**
   * 오늘 날짜와 비교하여 차이나는 일수 반환
   * @param {string} dateStr
   * @returns {number} btDay
   */
  const getTodayCompare = (dateStr) => {

    // 비교할 날짜를 연도/월/일로 나누어 Date 객체 생성
    let YYYYMMDD = dateStr.substr(0, 10);
    let dateArr = YYYYMMDD.split("-");    
    let stDate = new Date(dateArr[0], dateArr[1], dateArr[2]);
    
    // 오늘 날짜를 연도/월/일만 나누어 Date 객체 생성(월은 +1을 해줌)
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let endDate = new Date(year, month, day);
    
    // 오늘 날짜(endDate)에서 비교할 날짜(stDate)를 빼서 일수로 계산
    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = btMs / (1000 * 60 * 60 * 24);
    
    // 차이나는 일수 반환
    return Number(btDay);
  }
  
  /**
   * 특정 문자열에 검색어가 매칭이 되면 하이라이트 표시
   * @param {string} text 검색어
   * @returns {object} 하이라이트 태그를 포함한 html 노드
   */
  const setHighlight = (text) => {

    // 검색어가 없으면 기존 텍스트 리턴
    if (!searchStr) return text;
    
    // 검색어가 매칭되는 텍스트를 정규식으로 검사하여 리턴
    let regex = new RegExp(searchStr, 'gi');
    return text.replace(regex, '<span class="highlight">' + searchStr + '</span>');
  }

  return (
    <li className={getTodayCompare(JobData.createdAt) <= 2 ? "job-item new" : "job-item"}>
      <div className="title_job">
        <a href="#none" className="link_title">
          <strong dangerouslySetInnerHTML={{ __html: setHighlight(JobData.title) }} />
          <em>{JobData.job}</em>
        </a>
        <span className="bundle_badge">
          {JobData.keywords.map((item, idx) => {
            return (
              <a href="#none" 
                key={idx} 
                dangerouslySetInnerHTML={{ __html: setHighlight(item) }} 
              />
            );
          })}
        </span>
      </div>
      <div className="desc_job">
        <span className="badge_type">{JobData.type}</span>
        <div className="wrap_txt">
          <span className="txt_day">{dateFormat(JobData.createdAt)}</span>
          <span className="txt_location">{JobData.location}</span>
        </div>
      </div>
    </li>
  );
};
export default JobItem;