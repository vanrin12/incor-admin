import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

// worker Saga: will be fired on GET_LIST_EVENT actions
function* getProductDetail(action) {
  
  try {
    const response = yield call(() => API.get(ROUTES.API_LIST_PRODUCT, action.payload));
    if (response.ok) {
      const { data } = response.data;

      // In case: getProductDetailIndex request success
      yield put({ type: 'products/getProductDetailSuccess', data });
    } else {
      const { msg } = response?.data;
      // In case: getProductDetailIndex request failed
      yield put({
        type: 'products/getProductDetailFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'products/getProductDetailFailed' });
  }
}

/*
  Starts signup Account on each dispatched `getProductDetailIndex` action.
*/
function* getProductDetailSaga() {
  yield takeLatest('products/getProductDetail', getProductDetail);
}

export default getProductDetailSaga;
