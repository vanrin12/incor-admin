import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getDetailPartnerConstruction(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_DETAIL_PARTNER_CONSTRUCTION(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_DETAIL_PARTNER_CONSTRUCTION_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_DETAIL_PARTNER_CONSTRUCTION_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DETAIL_PARTNER_CONSTRUCTION_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_DETAIL_PARTNER_CONSTRUCTION` action.
*/
function* getDetailPartnerConstructionSaga() {
  yield takeLatest(
    Types.GET_DETAIL_PARTNER_CONSTRUCTION,
    getDetailPartnerConstruction
  );
}

export default getDetailPartnerConstructionSaga;
