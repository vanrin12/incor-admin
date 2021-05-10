import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* deleteConstruction(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.delete(ROUTES.API_UPDATE_PARTNER_CONSTRUCTION(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.DELETE_CONSTRUCTION_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.DELETE_CONSTRUCTION_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_CONSTRUCTION_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `DELETE_CONSTRUCTION` action.
*/
function* deleteConstructionSaga() {
  yield takeLatest(Types.DELETE_CONSTRUCTION, deleteConstruction);
}

export default deleteConstructionSaga;
