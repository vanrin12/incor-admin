import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* deletePartner(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.delete(ROUTES.API_DELETE_PARTNER, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.DELETE_PARTNER_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.DELETE_PARTNER_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_PARTNER_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `DELETE_PARTNER` action.
*/
function* deletePartnerSaga() {
  yield takeLatest(Types.DELETE_PARTNER, deletePartner);
}

export default deletePartnerSaga;
