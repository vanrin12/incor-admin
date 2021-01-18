import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getCategoriesDetail(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.GET_CATEGORIES_DETAIL(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_CATEGORIES_DETAIL_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_CATEGORIES_DETAIL_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_CATEGORIES_DETAIL_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_CATEGORIES_DETAIL` action.
*/
function* getCategoriesDetailSaga() {
  yield takeLatest(Types.GET_CATEGORIES_DETAIL, getCategoriesDetail);
}

export default getCategoriesDetailSaga;
