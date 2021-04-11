import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';
// worker Saga: will be fired on SIGN_UP actions
function* changePassword(action) {
  try {
    const response = yield call(() =>
      API.post(ROUTES.API_CHANGE_PASSWORD, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: signup request success
      yield put({ type: Types.CHANGE_PASSWORD_SUCCESS, data });
    } else {
      const { msg } = response?.data?.status;
      // In case: signup request failed
      yield put({
        type: Types.CHANGE_PASSWORD_FAILED,
        errorMsg: msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CHANGE_PASSWORD_FAILED });
  }
}

/*
  Starts signup Account on each dispatched `changePassword` action.
*/
function* changePasswordSaga() {
  yield takeLatest(Types.CHANGE_PASSWORD, changePassword);
}

export default changePasswordSaga;
