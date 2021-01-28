import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getListConstant(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_LIST_CONSTANT, action.data)
    );
    if (response.ok) {
      const { data } = response;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_CONSTANT_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_CONSTANT_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_CONSTANT_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_CONSTANT` action.
*/
function* getListConstantMySaga() {
  yield takeLatest(Types.GET_LIST_CONSTANT, getListConstant);
}

export default getListConstantMySaga;
