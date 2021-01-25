import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getListAllCategories(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_ALL_CATEGORIES, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_LIST_ALL_CATEGORIES_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_LIST_ALL_CATEGORIES_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_LIST_ALL_CATEGORIES_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_ALL_CATEGORIES` action.
*/
function* getListAllCategoriesSaga() {
  yield takeLatest(Types.GET_LIST_ALL_CATEGORIES, getListAllCategories);
}

export default getListAllCategoriesSaga;
