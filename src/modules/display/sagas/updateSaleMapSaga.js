import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* updateSaleMap(action) {
  try {
    const response = yield call(() =>
      API.post(ROUTES.API_DATA_MAP, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: Login request success
      yield put({ type: Types.UPDATE_SALE_MAP_SUCCESS, data });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.UPDATE_SALE_MAP_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_SALE_MAP_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* updateSaleMapSaga() {
  yield takeLatest(Types.UPDATE_SALE_MAP, updateSaleMap);
}

export default updateSaleMapSaga;
