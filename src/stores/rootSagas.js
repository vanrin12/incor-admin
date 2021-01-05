// import libs
import { all } from 'redux-saga/effects';
import getDataMainSaga from 'modules/home/sagas/getDataMainSaga';
import getListUserSaga from 'modules/accounts/sagas/getListUserSaga';
import getListRolesSaga from 'modules/accounts/sagas/getListRolesSaga';

export default function* RootSagas() {
  yield all([getDataMainSaga(), getListUserSaga(), getListRolesSaga()]);
}
