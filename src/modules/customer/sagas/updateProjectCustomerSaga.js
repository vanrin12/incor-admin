import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* updateProjectCustomer(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_UPDATE_PROJECT_CUSTOMER(action.id), action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPDATE_PROJECT_CUSTOMER_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPDATE_PROJECT_CUSTOMER_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_PROJECT_CUSTOMER_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_DIVISION` action.
*/
function* updateProjectCustomerSaga() {
  yield takeLatest(Types.UPDATE_PROJECT_CUSTOMER, updateProjectCustomer);
}

export default updateProjectCustomerSaga;
