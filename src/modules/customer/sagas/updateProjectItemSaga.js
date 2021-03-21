import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* updateProjectItem(action) {
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_UPDATE_PROJECT_ITEM(action.id), action.data)
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.UPDATE_PROJECT_ITEM_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.UPDATE_PROJECT_ITEM_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.UPDATE_PROJECT_ITEM_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_DIVISION` action.
*/
function* updateProjectItemSaga() {
  yield takeLatest(Types.UPDATE_PROJECT_ITEM, updateProjectItem);
}

export default updateProjectItemSaga;
