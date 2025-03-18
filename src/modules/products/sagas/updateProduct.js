import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

// worker Saga: will be fired on GET_LIST_EVENT actions
function* updateProduct(action) {
  console.log('action', action)
  try {
    const response = yield call(() =>
      API.post(ROUTES.UPDATE_PRODUCT(action.payload.id), action.payload.formData)
    );
    if (response.ok) {
      const { data } = response.data;

      // In case: updateProductIndex request success
      yield put({ type: 'products/updateProductSuccess', data });
    } else {
      const { msg } = response?.data;
      // In case: updateProductIndex request failed
      yield put({
        type: 'products/updateProductFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error

    yield put({ type: 'products/updateProductFailed' });
  }
}

/*
  Starts signup Account on each dispatched `updateProductIndex` action.
*/
function* updateProductSaga() {
  yield takeLatest('products/updateProduct', updateProduct);
}

export default updateProductSaga;
