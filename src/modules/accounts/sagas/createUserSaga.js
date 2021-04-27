import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

function* createUser(action) {
  try {
    const response = yield call(() =>
      API.post(
        ROUTES.USER_LIST,
        JSON.stringify({
          name: action?.payload?.name,
          password: 'abcd1234',
          role_name: action?.payload?.roleName,
          full_name: action?.payload?.full_name,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    );
    if (response.ok) {
      const { data } = response.data;

      yield put({
        type: 'accounts/createUserSuccess',
        data,
        userList: action?.payload?.userList,
      });
    } else {
      const { msg } = response?.data;
      yield put({
        type: 'accounts/createUserFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'accounts/createUserFailed' });
  }
}

function* createUserSaga() {
  yield takeLatest('accounts/createUser', createUser);
}

export default createUserSaga;
