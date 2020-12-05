import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from 'modules/accounts/redux';

const appReducer = combineReducers({
  account: accountReducer,
});

export default appReducer;
