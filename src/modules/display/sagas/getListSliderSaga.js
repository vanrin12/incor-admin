import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListSlider() {
  try {
    const response = yield call(() => API.get(ROUTES.API_MAIN_SLIDER));
    if (response.ok) {
      const { data } = response?.data;
      // In case: Login request success
      yield put({
        type: Types.GET_LIST_SLIDER_SUCCESS,
        data: data?.slider,
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.GET_LIST_SLIDER_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_SLIDER_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* getListSliderSaga() {
  yield takeLatest(Types.GET_LIST_SLIDER, getListSlider);
}

export default getListSliderSaga;
