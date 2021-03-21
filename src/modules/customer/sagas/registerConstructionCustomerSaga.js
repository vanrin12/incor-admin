import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* registerConstructionCustomer(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_REGISTER_CONSTRUCTION_CUSTOMER, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_CONSTRUCTION_CUSTOMER_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_CONSTRUCTION_CUSTOMER_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_CONSTRUCTION_CUSTOMER_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `REGISTER_CONSTRUCTION_CUSTOMER` action.
*/
function* registerConstructionCustomerSaga() {
  yield takeLatest(
    Types.REGISTER_CONSTRUCTION_CUSTOMER,
    registerConstructionCustomer
  );
}

export default registerConstructionCustomerSaga;
