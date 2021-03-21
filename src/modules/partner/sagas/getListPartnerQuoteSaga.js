import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getListPartnerQuote(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_LIST_PARTNER_QUOTE(action.id), action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_PARTNER_QUOTE_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_PARTNER_QUOTE_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_PARTNER_QUOTE_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_PARTNER_QUOTE` action.
*/
function* getListPartnerQuoteSaga() {
  yield takeLatest(Types.GET_LIST_PARTNER_QUOTE, getListPartnerQuote);
}

export default getListPartnerQuoteSaga;
