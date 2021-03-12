import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* getDetailProject(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_DETAIL_PROJECT(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.GET_DETAIL_PROJECT_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.GET_DETAIL_PROJECT_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_DETAIL_PROJECT_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_DIVISION` action.
*/
function* getDetailProjectSaga() {
  yield takeLatest(Types.GET_DETAIL_PROJECT, getDetailProject);
}

export default getDetailProjectSaga;
