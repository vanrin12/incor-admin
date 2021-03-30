import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

function* deleteUser(action) {
  try {
    const response = yield call(() =>
      API.delete(ROUTES.USER_LIST, action.payload)
    );
    if (response.ok) {
      const { data } = response.data;

      yield put({
        type: 'accounts/deleteUserSuccess',
        data,
      });
    } else {
      const { msg } = response?.data;
      yield put({
        type: 'accounts/deleteUserFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'accounts/deleteUserFailed' });
  }
}

function* deleteUserSaga() {
  yield takeLatest('accounts/deleteUser', deleteUser);
}

export default deleteUserSaga;
