// import libs
import { all } from 'redux-saga/effects';
import getDataMainSaga from 'modules/home/sagas/getDataMainSaga';
import getListUserSaga from 'modules/accounts/sagas/getListUserSaga';
import getListRolesSaga from 'modules/accounts/sagas/getListRolesSaga';
import getListPartnerSaga from 'modules/partner/sagas/getListPartnerSaga';
import getListAreasSaga from 'modules/partner/sagas/getListAreasSaga';
import getListConstantSaga from 'modules/partner/sagas/getListScalesSaga';
import getListCategoriesSaga from 'modules/post/sagas/getListCategoriesSaga';
import deleteCategoriesSaga from 'modules/post/sagas/deleteCategoriesSaga';
import registerCategoriesSaga from 'modules/post/sagas/registerCategoriesSaga';
import getListParentSaga from 'modules/post/sagas/getListParentSaga';
import getCategoriesDetailSaga from 'modules/post/sagas/getCategoriesDetailSaga';
import updateCategoriesSaga from 'modules/post/sagas/updateCategorySaga';
import getListPostSaga from 'modules/post/sagas/getListPostSaga';
import getListAllCategoriesSaga from 'modules/post/sagas/getListAllCategorySaga';
import registerPostSaga from 'modules/post/sagas/registerPostSaga';
import getListAllSeoTitleSaga from 'modules/post/sagas/getListSeoTitleSaga';
import deletePostSaga from 'modules/post/sagas/deletePostSaga';
import getPostDetailSaga from 'modules/post/sagas/getDetailPostSaga';
import loginSaga from 'modules/authen/sagas/loginSaga';
import updatePostSaga from 'modules/post/sagas/updatePostSaga';

export default function* RootSagas() {
  yield all([
    getDataMainSaga(),
    getListUserSaga(),
    getListRolesSaga(),
    getListPartnerSaga(),
    getListAreasSaga(),
    getListConstantSaga(),
    getListCategoriesSaga(),
    deleteCategoriesSaga(),
    registerCategoriesSaga(),
    getListParentSaga(),
    getCategoriesDetailSaga(),
    updateCategoriesSaga(),
    getListPostSaga(),
    getListAllCategoriesSaga(),
    registerPostSaga(),
    getListAllSeoTitleSaga(),
    deletePostSaga(),
    getPostDetailSaga(),
    loginSaga(),
    updatePostSaga(),
  ]);
}
