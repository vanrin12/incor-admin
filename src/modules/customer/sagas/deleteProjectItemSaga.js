import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from '../../../utils/Apis';
import { Types } from '../redux';

function* deleteProjectItem(action) {
  console.log(action, 'action');
  try {
    /**
     * Example data
     *
     */
    const response = yield call(() =>
      API.delete(ROUTES.API_DELETE_PROJECT_ITEM(action.id))
    );
    if (response.ok) {
      const { data } = response.data;
      // In case: setting/ageCategory request success
      yield put({ type: Types.DELETE_PROJECT_ITEM_SUCCESS, data });
    } else {
      // In case: setting/ageCategory request failed
      yield put({
        type: Types.DELETE_PROJECT_ITEM_FAILED,
        // errorMsg: response.data.message && response.data.message,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.DELETE_PROJECT_ITEM_FAILED, error });
  }
}

/*
  Starts signupAccount on each dispatched `GET_LIST_DIVISION` action.
*/
function* deleteProjectItemSaga() {
  yield takeLatest(Types.DELETE_PROJECT_ITEM, deleteProjectItem);
}

export default deleteProjectItemSaga;
