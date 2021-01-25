import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* registerPost(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.REGISTER_POST, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_POST_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_POST_FAILED,
        errorMsg: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_POST_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `REGISTER_POST` action.
*/
function* registerPostSaga() {
  yield takeLatest(Types.REGISTER_POST, registerPost);
}

export default registerPostSaga;
