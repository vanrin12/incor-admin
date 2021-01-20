import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getListAreas() {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() => API.get(ROUTES.GET_AREAS));
    if (response.ok) {
      const { data } = response;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_AREAS_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_AREAS_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_AREAS_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_AREAS` action.
*/
function* getListAreasSaga() {
  yield takeLatest(Types.GET_LIST_AREAS, getListAreas);
}

export default getListAreasSaga;
