import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* registerPartnerCompany(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_REGISTER_PARTNER_COMPANY, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_PARTNER_COMPANY_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_PARTNER_COMPANY_FAILED,
        errorMsg: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_PARTNER_COMPANY_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `REGISTER_PARTNER_COMPANY` action.
*/
function* registerPartnerCompanySaga() {
  yield takeLatest(Types.REGISTER_PARTNER_COMPANY, registerPartnerCompany);
}

export default registerPartnerCompanySaga;
