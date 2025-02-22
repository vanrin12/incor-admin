import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

// worker Saga: will be fired on GET_LIST_EVENT actions
function* getDataProducts(action) {
  
  try {
    const response = yield call(() => API.get(ROUTES.API_LIST_PRODUCT, action.payload));
    if (response.ok) {
      const { data } = response.data;

      // In case: getDataProductsIndex request success
      yield put({ type: 'products/getDataProductsSuccess', data });
    } else {
      const { msg } = response?.data;
      // In case: getDataProductsIndex request failed
      yield put({
        type: 'products/getDataProductsFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'products/getDataProductsFailed' });
  }
}

/*
  Starts signup Account on each dispatched `getDataProductsIndex` action.
*/
function* getDataProductsSaga() {
  yield takeLatest('products/getDataProducts', getDataProducts);
}

export default getDataProductsSaga;
