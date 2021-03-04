import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* updatePost(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.UPDATE_POST(action.id), action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPDATE_POST_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPDATE_POST_FAILED,
        errorMsg: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_POST_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `UPDATE_POST` action.
*/
function* updatePostSaga() {
  yield takeLatest(Types.UPDATE_POST, updatePost);
}

export default updatePostSaga;
