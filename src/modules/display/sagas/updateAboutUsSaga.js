import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* updateAboutUs(action) {
  try {
    const response = yield call(() =>
      API.post(ROUTES.API_ABOUT_US, action.data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    if (response.ok) {
      const { data, status } = response.data;
      // In case: Login request success
      yield put({ type: Types.UPDATE_ABOUT_US_SUCCESS, data, status });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.UPDATE_ABOUT_US_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_ABOUT_US_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* updateAboutUsSaga() {
  yield takeLatest(Types.UPDATE_ABOUT_US, updateAboutUs);
}

export default updateAboutUsSaga;
