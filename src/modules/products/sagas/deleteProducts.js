import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

// worker Saga: will be fired on GET_LIST_EVENT actions
function* deleteProducts(action) {
  
  try {
    const queryString = action.payload.join(',');
    const response = yield call(() =>
        API.delete(`${ROUTES.API_LIST_PRODUCT}?ids=${queryString}`)
      );
    if (response.ok) {
      const { data } = response.data;

      // In case: deleteProductsIndex request success
      yield put({ type: 'products/deleteProductsSuccess', data });
    } else {
      const { msg } = response?.data;
      // In case: deleteProductsIndex request failed
      yield put({
        type: 'products/deleteProductsFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'products/deleteProductsFailed' });
  }
}

/*
  Starts signup Account on each dispatched `deleteProductsIndex` action.
*/
function* deleteProductsSaga() {
  yield takeLatest('products/deleteProducts', deleteProducts);
}

export default deleteProductsSaga;
