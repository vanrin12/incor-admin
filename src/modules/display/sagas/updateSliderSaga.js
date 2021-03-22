import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* updateListSlider(action) {
  try {
    const response = yield call(() =>
      API.post(ROUTES.API_MAIN_SLIDER, action.data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    if (response.ok) {
      const { status } = response.data;

      // In case: Login request success
      yield put({ type: Types.UPDATE_LIST_SLIDER_SUCCESS, data: status });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.UPDATE_LIST_SLIDER_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_LIST_SLIDER_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* updateListSliderSaga() {
  yield takeLatest(Types.UPDATE_LIST_SLIDER, updateListSlider);
}

export default updateListSliderSaga;
