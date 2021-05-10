import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* deleteItemHeader(action) {
  try {
    const response = yield call(() =>
      API.delete(ROUTES.API_GET_DELETE_HEADER(action.id))
    );
    if (response.ok) {
      // In case: Login request success
      yield put({
        type: Types.DELETE_ITEM_HEADER_SUCCESS,
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.DELETE_ITEM_HEADER_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_ITEM_HEADER_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* deleteItemHeaderSaga() {
  yield takeLatest(Types.DELETE_ITEM_HEADER, deleteItemHeader);
}

export default deleteItemHeaderSaga;
