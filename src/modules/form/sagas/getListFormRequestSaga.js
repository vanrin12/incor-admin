import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getFormRequest(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_FORM_REQUEST, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_FORM_REQUEST_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_FORM_REQUEST_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_FORM_REQUEST_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_FORM_REQUEST` action.
*/
function* getFormRequestSaga() {
  yield takeLatest(Types.GET_FORM_REQUEST, getFormRequest);
}

export default getFormRequestSaga;
