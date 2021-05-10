import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* deletePartnerProduct(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.delete(ROUTES.API_UPDATE_PARTNER_PRODUCT(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.DELETE_PARTNER_PRODUCT_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.DELETE_PARTNER_PRODUCT_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_PARTNER_PRODUCT_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `DELETE_PARTNER_PRODUCT` action.
*/
function* deletePartnerProductSaga() {
  yield takeLatest(Types.DELETE_PARTNER_PRODUCT, deletePartnerProduct);
}

export default deletePartnerProductSaga;
