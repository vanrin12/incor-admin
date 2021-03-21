import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* registerProjectItem(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_REGISTER_PROJECT_ITEM, action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.REGISTER_PROJECT_ITEM_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.REGISTER_PROJECT_ITEM_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.REGISTER_PROJECT_ITEM_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_DIVISION` action.
*/
function* registerProjectItemSaga() {
  yield takeLatest(Types.REGISTER_PROJECT_ITEM, registerProjectItem);
}

export default registerProjectItemSaga;
