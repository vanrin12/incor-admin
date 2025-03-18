import { call, put, takeLatest } from 'redux-saga/effects';
import { ROUTES, API } from 'utils/Apis';

// worker Saga: will be fired on GET_LIST_EVENT actions
function* deleteProductImg(action) {
  
  try {
    console.log(action.payload, 'action.payload');
    
    const response = yield call(() => API.delete(ROUTES.DELETE_IMAGE_PRODUCT(action.payload)));
      console.log(response, 'response');
    if (response.ok) {
      const { data } = response.data;

      // In case: deleteProductImgIndex request success
      yield put({ type: 'products/deleteProductImgSuccess', data });
    } else {
      const { msg } = response?.data;
      // In case: deleteProductImgIndex request failed
      yield put({
        type: 'products/deleteProductImgFailed',
        errorMsg: msg.message,
      });
    }
  } catch (error) {
    // in case: server error
    console.log(error, 'error');
    yield put({ type: 'products/deleteProductImgFailed' });
  }
}

/*
  Starts signup Account on each dispatched `deleteProductImgIndex` action.
*/
function* deleteProductImgSaga() {
  yield takeLatest('products/deleteProductImg', deleteProductImg);
}

export default deleteProductImgSaga;
