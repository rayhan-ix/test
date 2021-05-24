import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import intl from 'react-intl-universal';
import _ from 'lodash';
import http from 'axios';
import Loader from 'react-loader-spinner';
import store from './store';
import ErrorFallback from './error-boundary/error-boundary';
import Layout from './pages/layout/layout';
import FormsContainer from './pages/forms/forms-container';
import FormIntegrateContainer from './pages/forms/form-integrate/form-integrate-container';

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

function App() {
  const [done, setDone] = useState(false);
  const loadLocales = () => {
    let currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      localStorageLocaleKey: 'lang',
    });
    if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
      currentLocale = 'en-US';
    }

    http
      .get(`locales/${currentLocale}.json`)
      .then((res) =>
        // init method will load CLDR locale data according to currentLocale
        intl.init({
          currentLocale,
          locales: {
            [currentLocale]: res.data,
          },
        })
      )
      .then(() => setDone(true));
  };

  useEffect(() => {
    loadLocales();
  }, []);

  return done ? (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Router>
          <Route exact path='/' component={Layout} />
          <Route exact path='/form' component={FormsContainer} />
          <Route exact path='/from-render' component={FormIntegrateContainer} />
        </Router>
      </Provider>
    </ErrorBoundary>
  ) : (
    <Loader type='Rings' color='#00BFFF' height={100} width={100} visible={!done} />
  );
}

export default App;
