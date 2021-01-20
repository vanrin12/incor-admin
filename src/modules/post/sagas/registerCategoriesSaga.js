import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* registerCategories(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.REGISTER_CATEGORIES, JSON.stringify(action.data))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_CATEGORIES_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_CATEGORIES_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_CATEGORIES_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `REGISTER_CATEGORIES` action.
*/
function* registerCategoriesSaga() {
  yield takeLatest(Types.REGISTER_CATEGORIES, registerCategories);
}

export default registerCategoriesSaga;
