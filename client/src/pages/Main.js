import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import DirectLink from '../components/DirectLink';
import DocHeader from '../components/DocHeader';
import ContainerSearch from '../components/ContainerSearch';
import DocMain from '../components/DocMain';
import DocFooter from '../components/DocFooter';
import '../styles/reset.scss';
import './Main.scss';

let allData = null;
const Main = () => {
  useEffect(() => {
    fetchData();
  }, []);

  // 통신 관련
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // 요청이 시작 할 때에는 error && data 초기화
      setError(null);
      setData(null);

      // loading 상태를 true 로 변경
      setLoading(true);
      const response = await axios.get('http://localhost:3001/rest/v1/jobs');

      // 응답 직업 데이터
      const jobList = response.data.jobList;

      // 시간 역순으로 정렬
      allData = jobList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      // 데이터 셋팅
      setData(allData);

      // 에러 캐치로 받음
    } catch (e) {
      setError(e);
    }

    // 로딩 완료
    setLoading(false);
  };

  /**
   * 검색값 업데이트
   * @param {string} str 검색값
   */
  const updateSearchStr = debounce(str => {
    console.log('filteringCheck');
    // 검색값 입력되었을 때
    if (str.length) {
      // 현재 검색어가 포함된 배열을 반환
      const searchIncludeData = setSearchIncludeData(str);

      // 검색어가 하나라도 포함되었을 때
      if (searchIncludeData.length) {
        setData(searchIncludeData);

        // 검색어가 포함이 안되있을 때
      } else {
        setData([]);
      }

      // 키워드가 빈값을때는 전체 데이터로 셋팅
    } else {
      setData(allData);
    }
  }, 900);

  const setSearchIncludeData = str => {
    let resultData = allData.filter(item => {
      // 현재 검색값 정규표현식 객체 생성
      let regex = new RegExp(str, 'gi');

      // 현재 검색값이 타이틀에 포함되어 있으면 true 반환
      let titleBln = regex.test(item.title);

      // 현재 검색값이 키워드에 포함되어 있으면
      let badgeBln = false;

      // 현재 검색값이 키워드에 포함되어 있으면 true 반환
      item.keywords.forEach(keyword => {
        if (regex.test(keyword)) {
          badgeBln = true;
          return;
        }
      });

      // 현재 검색값이 타이틀이나 키워드에 포함이 되어 있으면 현재 객체 리턴
      return (titleBln || badgeBln) && item;
    });

    return resultData;
  };

  // 상태에 따라 보여지는 로직
  if (loading) return <div className="state-msg">로딩중 입니다..</div>;
  if (error) return <div className="state-msg">에러가 발생했습니다</div>;

  // data가 없으면 아무것도 출력 안함
  if (!data) return null;

  // data가 있으면
  return (
    <div className="main">
      <DirectLink />
      <div className="container-doc">
        <DocHeader />
        <ContainerSearch
          jobLength={data.length}
          updateSearchStr={updateSearchStr}
        />
        <DocMain jobList={data} />
        <DocFooter />
      </div>
    </div>
  );
};

export default Main;
