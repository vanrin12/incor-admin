import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* updateCategories(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.put(ROUTES.UPDATE_CATEGORIES(action.id), JSON.stringify(action.data))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPDATE_CATEGORIES_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPDATE_CATEGORIES_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_CATEGORIES_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `UPDATE_CATEGORIES` action.
*/
function* updateCategoriesSaga() {
  yield takeLatest(Types.UPDATE_CATEGORIES, updateCategories);
}

export default updateCategoriesSaga;
