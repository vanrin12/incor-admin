import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* updateCustomerExp(action) {
  try {
    const response = yield call(() =>
      API.post(ROUTES.API_CUSTOMER_EXP, action.data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    if (response.ok) {
      const { data, status } = response.data;
      // In case: Login request success
      yield put({ type: Types.UPDATE_CUSTOMER_EXP_SUCCESS, data, status });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.UPDATE_CUSTOMER_EXP_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_CUSTOMER_EXP_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* updateCustomerExpSaga() {
  yield takeLatest(Types.UPDATE_CUSTOMER_EXP, updateCustomerExp);
}

export default updateCustomerExpSaga;
