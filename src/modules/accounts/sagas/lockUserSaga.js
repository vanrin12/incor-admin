import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

function* lockUser(action) {
  try {
    const response = yield call(() =>
      API.get(ROUTES.API_LOCK_USER, action.payload)
    );
    if (response.ok) {
      const { data } = response.data;

      yield put({
        type: 'accounts/lockUserSuccess',
        data,
      });
    } else {
      const { msg } = response?.data;
      yield put({
        type: 'accounts/lockUserFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'accounts/lockUserFailed' });
  }
}

function* lockUserSaga() {
  yield takeLatest('accounts/lockUser', lockUser);
}

export default lockUserSaga;
