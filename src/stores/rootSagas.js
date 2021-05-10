// import libs
import { all } from 'redux-saga/effects';
import getDataMainSaga from 'modules/home/sagas/getDataMainSaga';
import getListUserSaga from 'modules/accounts/sagas/getListUserSaga';
import getListRolesSaga from 'modules/accounts/sagas/getListRolesSaga';
import createUserSaga from 'modules//accounts/sagas/createUserSaga';
import getListPartnerSaga from 'modules/partner/sagas/getListPartnerSaga';
import getListAreasSaga from 'modules/partner/sagas/getListAreasSaga';
import getListConstantSaga from 'modules/partner/sagas/getListConstantSaga';
import getListScalesSaga from 'modules/partner/sagas/getListScalesSaga';
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
import logoutSaga from 'modules/authen/sagas/logoutSaga';
import getListPartnerManagementSaga from 'modules/partner/sagas/getListPartnerManagementSaga';
import deletePartnerSaga from 'modules/partner/sagas/deletePartnerSaga';
import registerPartnerCompanySaga from 'modules/partner/sagas/registerPartnerCompanySaga';
import getListPartnerProductSaga from 'modules/partner/sagas/getListPartnerProductSaga';
import getListConstructionSaga from 'modules/partner/sagas/getListConstructionsSaga';
import registerPartnerProductSaga from 'modules/partner/sagas/registerPartnerProductSaga';
import registerPartnerConstructionSaga from 'modules/partner/sagas/registerPartnerConstructionSaga';
import getListPartnerQuoteSaga from 'modules/partner/sagas/getListPartnerQuoteSaga';
import getDetailPartnerProductSaga from 'modules/partner/sagas/getDetailPartnerProductSaga';
import updatePartnerProductSaga from 'modules/partner/sagas/updatePartnerProductSaga';
import getDetailPartnerConstructionSaga from 'modules/partner/sagas/getDetailConstructionsSaga';
import updatePartnerConstructionSaga from 'modules/partner/sagas/updateConstructionsSaga';

import getListMediaSaga from 'modules/media/sagas/getListMediaSaga';
import uploadMediaSaga from 'modules/media/sagas/uploadMediaSaga';
import deleteMediaSaga from 'modules/media/sagas/deleteMediaSaga';
import getListCustomerSaga from 'modules/customer/sagas/getListCustomerSaga';
import getListNameSaga from 'modules/customer/sagas/getListNameIncorSaga';
import getDetailCustomerSaga from 'modules/customer/sagas/getDetailCustomerSaga';
import updateCustomerSaga from 'modules/customer/sagas/updateCustomerSaga';
import getListSpaceTypeSaga from 'modules/customer/sagas/getListSpaceTypeSaga';
import getListDivisionSaga from 'modules/customer/sagas/getListDivisonSaga';
import registerProjectSaga from 'modules/customer/sagas/registerProjectSaga';
import deleteProjectSaga from 'modules/customer/sagas/deleteProjectSaga';
import getDetailProjectSaga from 'modules/customer/sagas/getDetailProjectSaga';
import getListProjectSaga from 'modules/customer/sagas/getListProjectSaga';
import getListConstructionCustomerSaga from 'modules/customer/sagas/getListConstructionSaga';
import registerConstructionCustomerSaga from 'modules/customer/sagas/registerConstructionCustomerSaga';
import registerProjectItemSaga from 'modules/customer/sagas/registerProjectItemSaga';
import updateProjectItemSaga from 'modules/customer/sagas/updateProjectItemSaga';
import createIntroduceSaga from 'modules/display/sagas/createDisplayIntroduceSaga';
import getValueHeaderSaga from 'modules/display/sagas/getValueHeaderSaga';
import createFooterSaga from 'modules/display/sagas/createDisplayFooterSaga';

import updateAboutUsSaga from 'modules/display/sagas/updateAboutUsSaga';

import getAboutUsSaga from 'modules/display/sagas/getDataAboutUsSaga';

import getCustomerExperiencesSaga from 'modules/display/sagas/getCustomerSaga';
import updateCustomerExpSaga from 'modules/display/sagas/updateCustomerSaga';
import getDataMapSaga from 'modules/display/sagas/getDataMapSaga';
import getDataFooterSaga from 'modules/display/sagas/getDataFooterSaga';
import updateSaleMapSaga from 'modules/display/sagas/updateSaleMapSaga';
import getListSliderSaga from 'modules/display/sagas/getListSliderSaga';
import deleteSliderSaga from 'modules/display/sagas/deleteSliderSaga';
import updateListSliderSaga from 'modules/display/sagas/updateSliderSaga';
import getListLayoutSaga from 'modules/display/sagas/getListLayoutSaga';
import deleteUserSaga from 'modules/accounts/sagas/deleteUserSaga';

import deleteProjectItem from 'modules/customer/sagas/deleteProjectItemSaga';
import changePasswordSaga from 'modules/authen/sagas/changePasswordSaga';
import getListFormRequestSaga from 'modules/form/sagas/getListFormRequestSaga';
import lockUserSaga from 'modules/accounts/sagas/lockUserSaga';

import updateProjectSaga from 'modules/customer/sagas/updateProjectSaga';
import getNamePartnerSaga from 'modules/customer/sagas/getNamePartnerSaga';
import uploadImageConstructionSaga from 'modules/partner/sagas/uploadImageConstructionSaga';
import deleteProjectCustomerSaga from 'modules/customer/sagas/deleteProjectCustomerSaga';
import updateProjectCustomerSaga from 'modules/customer/sagas/updateProjectCustomerSaga';
import deleteFormRequestSaga from 'modules/form/sagas/deleteFormRequestSaga';
import deleteImageSaga from 'modules/partner/sagas/deleteImageImageSaga';
import deleteConstruction from 'modules/partner/sagas/deleteContructionSaga';
import deleteItemHeaderSaga from 'modules/display/sagas/deleteItemHeaderSaga';

export default function* RootSagas() {
  yield all([
    getDataMainSaga(),
    getListUserSaga(),
    getListRolesSaga(),
    createUserSaga(),
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
    logoutSaga(),
    getListPartnerManagementSaga(),
    getListMediaSaga(),
    deletePartnerSaga(),
    registerPartnerCompanySaga(),
    getListScalesSaga(),
    getListPartnerProductSaga(),
    getListConstructionSaga(),
    registerPartnerProductSaga(),
    uploadMediaSaga(),
    registerPartnerConstructionSaga(),
    getListPartnerQuoteSaga(),
    getDetailPartnerProductSaga(),
    updatePartnerProductSaga(),
    getDetailPartnerConstructionSaga(),
    updatePartnerConstructionSaga(),
    deleteMediaSaga(),
    getListCustomerSaga(),
    getListNameSaga(),
    getDetailCustomerSaga(),
    updateCustomerSaga(),
    getListSpaceTypeSaga(),
    getListDivisionSaga(),
    registerProjectSaga(),
    deleteProjectSaga(),
    getDetailProjectSaga(),
    getListProjectSaga(),
    getListConstructionCustomerSaga(),
    registerConstructionCustomerSaga(),
    registerProjectItemSaga(),
    updateProjectItemSaga(),
    createIntroduceSaga(),
    getValueHeaderSaga(),
    createFooterSaga(),
    updateProjectSaga(),
    updateAboutUsSaga(),
    getAboutUsSaga(),
    getCustomerExperiencesSaga(),
    updateCustomerExpSaga(),
    getDataMapSaga(),
    getDataFooterSaga(),
    updateSaleMapSaga(),
    getListSliderSaga(),
    deleteSliderSaga(),
    updateListSliderSaga(),
    getListLayoutSaga(),
    deleteUserSaga(),
    deleteProjectItem(),
    changePasswordSaga(),
    getListFormRequestSaga(),
    lockUserSaga(),
    getNamePartnerSaga(),
    uploadImageConstructionSaga(),
    deleteProjectCustomerSaga(),
    updateProjectCustomerSaga(),
    deleteFormRequestSaga(),
    deleteImageSaga(),
    deleteConstruction(),
    deleteItemHeaderSaga(),
  ]);
}
