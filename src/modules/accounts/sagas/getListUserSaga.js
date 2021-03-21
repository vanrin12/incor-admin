import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

function* getUserList(action) {
  try {
    const response = yield call(() =>
      API.get(ROUTES.USER_LIST, action.payload)
    );
    if (response.ok) {
      const { data } = response.data;

      yield put({ type: 'accounts/getListUserSuccess', data });
    } else {
      const { msg } = response?.data;
      yield put({
        type: 'accounts/getListUserFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'accounts/getListUserFailed' });
  }
}

function* getListUserSaga() {
  yield takeLatest('accounts/getListUser', getUserList);
}

export default getListUserSaga;
