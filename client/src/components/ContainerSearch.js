import React from 'react';
import './ContainerSearch.scss';

const ContainerSearch = props => {
  const { jobLength, updateSearchStr } = props;
  const changeSearchStr = e => {
    updateSearchStr(e.target.value);
  };
  return (
    <div className="container-search">
      <div className="sub_tit">
        <strong>DKTechin 구인 현황</strong>
        <div className="wrap_search">
          <div className="bundle_inp">
            <input type="text" onChange={changeSearchStr} />
            <button type="button">
              <span className="ir_pm">검색</span>
            </button>
          </div>
        </div>
        <p>
          검색 결과 <em>{jobLength}</em>건
        </p>
      </div>
    </div>
  );
};
export default ContainerSearch;
