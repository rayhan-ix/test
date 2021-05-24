import intl from 'react-intl-universal';
import _ from 'lodash';
import http from 'axios';

const SUPPOER_LOCALES = [
  {
    name: 'English',
    value: 'en-US',
  },
  {
    name: '日本語',
    value: 'ja-JP',
  },
];

export const loadLocales = () => {
  let currentLocale = intl.determineLocale({
    urlLocaleKey: 'lang',
    cookieLocaleKey: 'lang',
  });
  if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
    currentLocale = 'en-US';
  }

  http
    .get(`locales/${currentLocale}.json`)
    .then((res) => {
      console.log('App locale data', res.data);
      // init method will load CLDR locale data according to currentLocale
      return intl.init({
        currentLocale,
        locales: {
          [currentLocale]: res.data,
        },
      });
    })
    .then(() => true)
    .catch(() => false);
};
