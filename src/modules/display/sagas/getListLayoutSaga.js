import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getListLayout(action) {
  try {
    const response = yield call(() =>
      API.get(ROUTES.API_GET_LIST_LAYOUT(action.layout))
    );
    if (response.ok) {
      const { data } = response?.data;
      // In case: Login request success
      yield put({
        type: Types.GET_LIST_LAYOUT_SUCCESS,
        data,
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.GET_LIST_LAYOUT_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_LAYOUT_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* getListLayoutSaga() {
  yield takeLatest(Types.GET_LIST_LAYOUT, getListLayout);
}

export default getListLayoutSaga;
