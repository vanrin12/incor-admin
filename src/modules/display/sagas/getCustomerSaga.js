import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';
import { Types } from '../redux';

// worker Saga: will be fired on SEND_INVITE actions
function* getCustomerExperiences() {
  try {
    const response = yield call(() => API.get(ROUTES.API_CUSTOMER_EXP));
    if (response.ok) {
      const { data } = response?.data;
      // In case: Login request success
      yield put({
        type: Types.GET_CUSTOMER_EXP_SUCCESS,
        data,
      });
    } else {
      // In case: Login request failed
      yield put({
        type: Types.GET_CUSTOMER_EXP_FAILED,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_CUSTOMER_EXP_FAILED, error });
  }
}

/*
  Starts login on each dispatched `SIGN_IN` action.
*/
function* getCustomerExperiencesSaga() {
  yield takeLatest(Types.GET_CUSTOMER_EXP, getCustomerExperiences);
}

export default getCustomerExperiencesSaga;
