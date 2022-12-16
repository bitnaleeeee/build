import React from 'react';
import DocHeader from '../components/DocHeader';
import ContainerSearch from '../components/ContainerSearch';
import DocMain from '../components/DocMain';
import DocFooter from '../components/DocFooter';
import DirectLink from '../components/DirectLink';
import './Main.scss';

const Main = () => {
  return (
    <div>
      <DirectLink />
      <div className="container-doc">
        <DocHeader />
        <ContainerSearch />
        <DocMain />
        <DocFooter />
      </div>
    </div>
  );
};

export default Main;
