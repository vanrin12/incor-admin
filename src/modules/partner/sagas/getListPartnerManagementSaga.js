import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getListPartnerManagement(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_PARTNER_MANAGEMENT(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_PARTNER_MANAGEMENT_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_PARTNER_MANAGEMENT_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_PARTNER_MANAGEMENT_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_PARTNER_MANAGEMENT` action.
*/
function* getListPartnerManagementSaga() {
  yield takeLatest(Types.GET_LIST_PARTNER_MANAGEMENT, getListPartnerManagement);
}

export default getListPartnerManagementSaga;
