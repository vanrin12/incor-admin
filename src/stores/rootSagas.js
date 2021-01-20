// import libs
import { all } from 'redux-saga/effects';
import getDataMainSaga from 'modules/home/sagas/getDataMainSaga';
import getListUserSaga from 'modules/accounts/sagas/getListUserSaga';
import getListRolesSaga from 'modules/accounts/sagas/getListRolesSaga';
import getListPartnerSaga from 'modules/partner/sagas/getListPartnerSaga';
import getListAreasSaga from 'modules/partner/sagas/getListAreasSaga';
import getListScalesSaga from 'modules/partner/sagas/getListScalesSaga';
import getListCategoriesSaga from 'modules/post/sagas/getListCategoriesSaga';
import deleteCategoriesSaga from 'modules/post/sagas/deleteCategoriesSaga';
import registerCategoriesSaga from 'modules/post/sagas/registerCategoriesSaga';
import getListParentSaga from 'modules/post/sagas/getListParentSaga';
import getCategoriesDetailSaga from 'modules/post/sagas/getCategoriesDetailSaga';
import updateCategoriesSaga from 'modules/post/sagas/updateCategorySaga';

export default function* RootSagas() {
  yield all([
    getDataMainSaga(),
    getListUserSaga(),
    getListRolesSaga(),
    getListPartnerSaga(),
    getListAreasSaga(),
    getListScalesSaga(),
    getListCategoriesSaga(),
    deleteCategoriesSaga(),
    registerCategoriesSaga(),
    getListParentSaga(),
    getCategoriesDetailSaga(),
    updateCategoriesSaga(),
  ]);
}
