import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getAboutUs() {
  try {
    const response = yield call(() => API.get(ROUTES.API_ABOUT_US));
    if (response.ok) {
      const { data } = response?.data;
      // In case: Login request success
      yield put({
        type: Types.GET_ABOUT_US_SUCCESS,
        data: data && data.about,
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.GET_ABOUT_US_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_ABOUT_US_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* getAboutUsSaga() {
  yield takeLatest(Types.GET_ABOUT_US, getAboutUs);
}

export default getAboutUsSaga;
