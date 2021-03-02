import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListMedia(action) {
  const { pages, mediaType } = action.data;
  const params = `${mediaType}?pages=${pages}`;
  try {
    const response = yield call(() =>
      API.get(ROUTES.API_GET_LIST_MEDIA(params))
    );

    if (response.ok) {
      const { data } = response.data;
      // In case: Login request success
      yield put({ type: Types.GET_LIST_MEDIA_SUCCESS, data });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.GET_LIST_MEDIA_FAILED,
        errors: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_MEDIA_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* getListMediaSaga() {
  yield takeLatest(Types.GET_LIST_MEDIA, getListMedia);
}

export default getListMediaSaga;
