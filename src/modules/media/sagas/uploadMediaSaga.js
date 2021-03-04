import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* uploadMedia(action) {
  try {
    /**
     * Example data
     * url: /revenues/store
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_UPLOAD_MEDIA, action.data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );

    if (response.ok) {
      // In case: request success
      yield put({
        type: Types.UPLOAD_MEDIA_SUCCESS,
        data: response.data,
      });
    } else {
      // In case: request failed
      yield put({
        type: Types.UPLOAD_MEDIA_FAILED,
        error: response.data && response.data.error,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPLOAD_MEDIA_FAILED, error });
  }
}

/*
  Starts get revenues list on each dispatched `GET_PAYMENT_HISTORY` action.
*/
function* uploadMediaSaga() {
  yield takeLatest(Types.UPLOAD_MEDIA, uploadMedia);
}

export default uploadMediaSaga;
