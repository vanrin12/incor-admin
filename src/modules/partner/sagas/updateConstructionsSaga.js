import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* updatePartnerConstruction(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_UPDATE_PARTNER_CONSTRUCTION(action.id), action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPDATE_PARTNER_CONSTRUCTION_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPDATE_PARTNER_CONSTRUCTION_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_PARTNER_CONSTRUCTION_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `UPDATE_PARTNER_CONSTRUCTION` action.
*/
function* updatePartnerConstructionSaga() {
  yield takeLatest(
    Types.UPDATE_PARTNER_CONSTRUCTION,
    updatePartnerConstruction
  );
}

export default updatePartnerConstructionSaga;
