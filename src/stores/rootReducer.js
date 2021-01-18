import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from 'modules/accounts/redux';
import homeReducer from 'modules/home/redux';
import { partnerReducer } from 'modules/partner/redux';
import { postReducer } from 'modules/post/redux';

const appReducer = combineReducers({
  account: accountReducer,
  main: homeReducer,
  partnerReducer,
  postReducer,
});

export default appReducer;
