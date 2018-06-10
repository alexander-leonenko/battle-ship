import { combineReducers } from 'redux';
import { RootState } from './state';
import { gridReducer } from './grid';
import { routerReducer, RouterState } from 'react-router-redux';

export { RootState, RouterState };

export const rootReducer = combineReducers<RootState>({
  grid: gridReducer as any,
  router: routerReducer as any
});
