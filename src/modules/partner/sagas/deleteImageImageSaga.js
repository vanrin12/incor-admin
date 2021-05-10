import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* deleteImage(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.delete(ROUTES.DELETE_IMAGE(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.DELETE_IMAGE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.DELETE_IMAGE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_IMAGE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `DELETE_IMAGE` action.
*/
function* deleteImageSaga() {
  yield takeLatest(Types.DELETE_IMAGE, deleteImage);
}

export default deleteImageSaga;
