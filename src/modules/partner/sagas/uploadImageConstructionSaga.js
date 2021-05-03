import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* uploadImageConstruction(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.CONSTRUCTIONS_UPLOAD, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPLOAD_IMAGE_CONSTRUCTION_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPLOAD_IMAGE_CONSTRUCTION_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPLOAD_IMAGE_CONSTRUCTION_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `UPLOAD_IMAGE_CONSTRUCTION` action.
*/
function* uploadImageConstructionSaga() {
  yield takeLatest(Types.UPLOAD_IMAGE_CONSTRUCTION, uploadImageConstruction);
}

export default uploadImageConstructionSaga;
