import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

// worker Saga: will be fired on GET_LIST_EVENT actions
function* addProduct(action) {
  
  try {
    const response = yield call(() =>
      API.post(ROUTES.API_LIST_PRODUCT, action.payload)
    );
    if (response.ok) {
      const { data } = response.data;

      // In case: addProductIndex request success
      yield put({ type: 'products/addProductSuccess', data });
    } else {
      const { msg } = response?.data;
      // In case: addProductIndex request failed
      yield put({
        type: 'products/addProductFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'products/addProductFailed' });
  }
}

/*
  Starts signup Account on each dispatched `addProductIndex` action.
*/
function* addProductSaga() {
  yield takeLatest('products/addProduct', addProduct);
}

export default addProductSaga;
