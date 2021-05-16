import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* sendMailPartner(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_SEND_MAIL_PARTNER(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.SEND_MAIL_PARTNER_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.SEND_MAIL_PARTNER_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.SEND_MAIL_PARTNER_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `SEND_MAIL_PARTNER` action.
*/
function* sendMailPartnerSaga() {
  yield takeLatest(
    Types.SEND_MAIL_PARTNER,
    sendMailPartner
  );
}

export default sendMailPartnerSaga;
