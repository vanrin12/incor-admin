import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'apis';

function* getRoles() {
  try {
    const response = yield call(() => API.get(ROUTES.GET_ROLES));
    if (response.ok) {
      const { data } = response.data;

      yield put({ type: 'accounts/getUserRolesSuccess', data });
    } else {
      const { msg } = response?.data;
      yield put({
        type: 'accounts/getUserRolesFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'accounts/getUserRolesFailed' });
  }
}

function* getListRolesSaga() {
  yield takeLatest('accounts/getUserRoles', getRoles);
}

export default getListRolesSaga;
