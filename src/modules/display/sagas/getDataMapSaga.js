import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getDataMap(action) {
  try {
    const response = yield call(() =>
      API.get(ROUTES.API_DATA_MAP, action.data)
    );
    if (response.ok) {
      const { data } = response?.data;
      // In case: Login request success
      yield put({
        type: Types.GET_DATA_MAP_SUCCESS,
        data: data?.map && data?.map[0],
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.GET_DATA_MAP_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DATA_MAP_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* getDataMapSaga() {
  yield takeLatest(Types.GET_DATA_MAP, getDataMap);
}

export default getDataMapSaga;
