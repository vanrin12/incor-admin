import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* deleteMedia(action) {
  try {
    const response = yield call(() =>
      API.delete(ROUTES.API_DELETE_MEDIA(action.id))
    );

    if (response.ok) {
      const { data, status } = response.data;
      // In case: Login request success
      yield put({ type: Types.DELETE_MEDIA_SUCCESS, data, status });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.DELETE_MEDIA_FAILED,
        errors: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_MEDIA_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* deleteMediaSaga() {
  yield takeLatest(Types.DELETE_MEDIA, deleteMedia);
}

export default deleteMediaSaga;
