import React from 'react';
import { useHistory } from 'react-router';
import _ from 'lodash';

const ChangeLang = () => {
  const history = useHistory();
  const changeLang = () => {
    const locale = _.sample(['en-US', 'ja-JP']);
    localStorage.setItem('lang', locale || 'en-US');
    history.go(0);
  };
  return (
    <>
      <button type='button' onClick={() => changeLang()}>
        change lang
      </button>
    </>
  );
};

export default ChangeLang;
