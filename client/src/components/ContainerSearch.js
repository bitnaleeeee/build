import React from 'react';
import './ContainerSearch.scss';

const ContainerSearch = () => {
  return (
    <div class="container-search">
      <div class="sub_tit">
        <strong>DKTechin 구인 현황</strong>
        <div class="wrap_search">
          <div class="bundle_inp">
            <input type="text" />
            <button type="button">
              <span class="ir_pm">검색</span>
            </button>
          </div>
        </div>
        <p>
          검색 결과 <em>3</em>건
        </p>
      </div>
    </div>
  );
};

export default ContainerSearch;
