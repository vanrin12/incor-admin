import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getListSpaceType() {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() => API.get(ROUTES.API_GET_LIST_SPACE_TYPE));
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_SPACE_TYPE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_SPACE_TYPE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_SPACE_TYPE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_SPACE_TYPE` action.
*/
function* getListSpaceTypeSaga() {
  yield takeLatest(Types.GET_LIST_SPACE_TYPE, getListSpaceType);
}

export default getListSpaceTypeSaga;
