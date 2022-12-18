import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocHeader from '../components/DocHeader';
import ContainerSearch from '../components/ContainerSearch';
import DocMain from '../components/DocMain';
import DocFooter from '../components/DocFooter';
import DirectLink from '../components/DirectLink';
import './Main.scss';

let allData = null;

const Main = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/rest/v1/jobs`);

      const jobList = response.data.jobList;
      console.log(jobList);

      allData = job.List.sort((before, after) => {
        return new DataTransfer(before.createAt) - new Data(after.createdAt);
      });
      setData(allData);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const updateSearchStr = str => {
    if (str.length) {
      const searchIncludeData = data.filter(item => {
        let regex = new RegExp(str, 'gi');

        let titleBln = regex.test(item.title);

        let badgeBln = false;

        item.keywords.forEach(keyword => {
          console.log('keyword Check');
          if (regex.test(keyword)) {
            badgeBln = true;
            return;
          }
        });
        return (titleBln || badgeBln) && item;
      });

      if (searchIncludeData.length) {
        setData(searchIncludeData);
      }
    } else {
      setData(allData);
    }

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    if (!data) return null;
  };

  return (
    <div>
      <DirectLink />
      <div className="container-doc">
        <DocHeader />
        <ContainerSearch updateSearchStr={updateSearchStr} />
        <DocMain jobList={data} />
        <DocFooter />
      </div>
    </div>
  );
};

export default Main;
