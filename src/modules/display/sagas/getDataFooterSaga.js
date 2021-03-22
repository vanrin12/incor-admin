import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getDataFooter() {
  try {
    const response = yield call(() => API.get(ROUTES.API_GET_DATA_FOOTER));
    if (response.ok) {
      const { data } = response?.data;
      // In case: Login request success
      yield put({
        type: Types.GET_DATA_FOOTER_SUCCESS,
        data,
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.GET_DATA_FOOTER_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DATA_FOOTER_FAILED, error });
  }
}

/*
  Starts login on each dispatched `GET_DATA_FOOTER` action.
*/
function* getDataFooterSaga() {
  yield takeLatest(Types.GET_DATA_FOOTER, getDataFooter);
}

export default getDataFooterSaga;
