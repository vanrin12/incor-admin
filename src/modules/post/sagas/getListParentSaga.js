import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getListParent() {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() => API.get(ROUTES.GET_PARENT));
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_PARENT_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_PARENT_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_PARENT_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_PARENT` action.
*/
function* getListParentSaga() {
  yield takeLatest(Types.GET_LIST_PARENT, getListParent);
}

export default getListParentSaga;
