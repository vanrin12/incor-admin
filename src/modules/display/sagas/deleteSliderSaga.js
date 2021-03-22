import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* deleteSlider(action) {
  try {
    const response = yield call(() =>
      API.delete(ROUTES.API_DELETE_SLIDER(action.id))
    );
    if (response.ok) {
      const { data } = response?.data;
      // In case: Login request success
      yield put({
        type: Types.DELETE_SLIDER_SUCCESS,
        data,
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.DELETE_SLIDER_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_SLIDER_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* deleteSliderSaga() {
  yield takeLatest(Types.DELETE_SLIDER, deleteSlider);
}

export default deleteSliderSaga;
