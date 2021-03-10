import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* registerPartnerConstruction(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_REGISTER_PARTNER_CONSTRUCTION, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_PARTNER_CONSTRUCTION_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_PARTNER_CONSTRUCTION_FAILED,
        errorMsg: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_PARTNER_CONSTRUCTION_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `REGISTER_PARTNER_CONSTRUCTION` action.
*/
function* registerPartnerConstructionSaga() {
  yield takeLatest(
    Types.REGISTER_PARTNER_CONSTRUCTION,
    registerPartnerConstruction
  );
}

export default registerPartnerConstructionSaga;
