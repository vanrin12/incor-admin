import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from 'modules/accounts/redux';
import homeReducer from 'modules/home/redux';

const appReducer = combineReducers({
  account: accountReducer,
  main: homeReducer,
});

export default appReducer;
