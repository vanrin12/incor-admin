import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'apis';

// worker Saga: will be fired on GET_LIST_EVENT actions
function* getDataMain() {
  try {
    const response = yield call(() => API.get(ROUTES.GET_DATA_HOME));
    if (response.ok) {
      const { data } = response.data;

      // In case: getMainIndex request success
      yield put({ type: 'main/getDataMainSuccess', data });
    } else {
      const { msg } = response?.data;
      // In case: getMainIndex request failed
      yield put({
        type: 'main/getDataMainFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'main/getDataMainFailed' });
  }
}

/*
  Starts signup Account on each dispatched `getMainIndex` action.
*/
function* getDataMainSaga() {
  yield takeLatest('main/getDataMain', getDataMain);
}

export default getDataMainSaga;
