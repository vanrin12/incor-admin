import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* deleteCategories(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.delete(ROUTES.DELETE_CATEGORIES, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.DELETE_CATEGORIES_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.DELETE_CATEGORIES_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_CATEGORIES_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `DELETE_CATEGORIES` action.
*/
function* deleteCategoriesSaga() {
  yield takeLatest(Types.DELETE_CATEGORIES, deleteCategories);
}

export default deleteCategoriesSaga;
