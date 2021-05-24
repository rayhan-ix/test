/* eslint-disable import/no-extraneous-dependencies */
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { batch, batching } from 'redux-batch-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createRootReducer from './reducer';

export const history = createBrowserHistory();

const middlewares = applyMiddleware(routerMiddleware(history), thunk, batch);
const store = createStore(
  batching(createRootReducer(history)),
  {},
  composeWithDevTools(middlewares)
);

export default store;
