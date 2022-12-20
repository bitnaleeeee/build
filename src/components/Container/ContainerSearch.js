import React from "react";
import "./ContainerSearch.scss";

const ContainerSearch = (props) => {
  const {jobLength, updateSearchStr,} = props;

  /**
   * 인풋 체인지 이벤트 함수
   * @param {object} e 이벤트 객체
   */
  const changeSearchStr = (e) => {

    // 일반 문자일경우 검색어 업데이트
    if (!checkCharacter(e.target.value)) {
      updateSearchStr(e.target.value);

    // 특수 문자일경우 인풋 입력을 막음
    } else {
      e.target.value = '';
    }
  }

  /**
   * 해당 검색어가 특수문자인지 체크
   * @param {string} str 검색어
   * @returns {boolean} 특수문자가 맞으면 true, 아니면 false
   */
  const checkCharacter = (str) => {
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    return regExp.test(str);
  }

  return (
    <div className="container-search">
      <div className="sub_tit">
        <strong>DKTechin 구인 현황</strong>
        <div className="wrap_search">
          <div className="bundle_inp">
            <input type="text" onChange={changeSearchStr} />
            <button type="button"><span className="ir_pm">검색</span></button>
          </div>
        </div>
        <p>검색 결과 <em>{jobLength}</em>건</p>
      </div>
    </div>
  );
};
export default ContainerSearch;
