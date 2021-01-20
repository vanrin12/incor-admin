// @flow

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { createBrowserHistory } from 'history';

import ROUTERS from 'constants/router';

import { API } from '../utils/Apis';
// import PrivateRoute from './PrivateRoute';

const HomeMain = lazy(() => import('modules/home/components'));
const Partner = lazy(() =>
  import('modules/partner/containers/partnerContainer')
);
const Customer = lazy(() => import('modules/customer/components'));
const CustomerInfo = lazy(() =>
  import('modules/customer/components/informationNeedsProject')
);
const Post = lazy(() => import('modules/post/containers/postContainer'));
const RegisterPost = lazy(() =>
  import('modules/post/containers/registerPostContainer')
);
const DetailPost = lazy(() =>
  import('modules/post/containers/detailPostContainer')
);
const RegisterCategoryPost = lazy(() =>
  import('modules/post/containers/registerCategoryContainer')
);
const UpdateCategoryPost = lazy(() =>
  import('modules/post/containers/editCategoryContainer')
);
const accountComponents = lazy(() => import('modules/accounts/components'));
const partnerManagement = lazy(() =>
  import('modules/partner/components/partnerManagement')
);
const informationNeeds = lazy(() =>
  import('modules/customer/components/infomationNeeds')
);
const informationProjectRegister = lazy(() =>
  import('modules/customer/components/informationProjectRegister')
);
const progressProject = lazy(() =>
  import('modules/customer/components/progressProject')
);
const displayContainer = lazy(() => import('modules/display/components'));
const displayIdentifiedContainer = lazy(() =>
  import('modules/display/components/identified')
);
const displayMainContainer = lazy(() =>
  import('modules/display/components/main')
);
const displaySaleContainer = lazy(() =>
  import('modules/display/components/sale')
);

const Router = () => {
  // const history = createBrowserHistory();
  // const token = useSelector((state) => state.account.token);
  // const isAuthenticated = token !== '';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2E5MDAwMGE0NTM3MTJlNmE1NzI3M2I4ZGQxM2Q5ODk0ZGI4NGZhYjE0ZjdkODUyZGVjOTIzNmZmZTExNDU4ODQ4NWIwZDQ2MjU1ZWNhNzAiLCJpYXQiOjE2MTEwNjMyMzIsIm5iZiI6MTYxMTA2MzIzMiwiZXhwIjoxNjQyNTk5MjMyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.m2RWFI80w3C_xl2JXW9iyw3vwKTZyPOmczpzONaKIVspiCSB5PE58_tU2GYCodZCQBhJCh_Jc9ahnnkWogxsrtfm1USOC7XpSfMe74xbt16jXvY_cv1X0eAKXWU83zUIh4a6tcUOqKesqs8ScL8KBW4RGdEn-UTnAVM2RSZAiNlkrzpXie5zEIIYyWADpR_GTSQwlQ0RYHONeKSPjFSokKN75rYvWfwZGvCxuiu-kSGByD_6DMmGijLcWOATCOOT-T2lo1UJ8bxZmx50NDBggKtW3SnP8PbSBt8jo7qfYhdpMSFDLWv6a0nXb6nxmBY14dJYq-_tZoeUB03UPme3P9G2PdEuAs_JQUJvVpmTMfW_iztr_aaeb9fEC---kx3IcwZ2iYcepheCqlhfLIBdbe3sVmEW2VlEnfGA4G_VTWhqlsNEhG3tfQFpfrzjTqA1dQrwOiH5Xlwnq3o01FJ2zBAJVnD2a8WxnTnne1xwtmNgd2fcAgr4SmP8VgJGtXQ_RyX6k3fVpN3ru9enU9esgrL5rcdjh0oAfkY4SZLOQMtB85AVMD390Sfond03S4p7bckVMtC9cjDPguDBzpzNdxTTYmbdADdGFi4FoSpfb5QIspdL6NSjxGvOv3tEqw53SGSg1pFL3Vq_rFDhVOqjZtWpbXgtE9fhpXW9mDb4ZHQ';
  // if (token) {
  API.setHeader('Authorization', `Bearer ${token}`);
  return (
    <BrowserRouter>
      <Suspense>
        <Switch>
          <Route exact path={ROUTERS.MAIN_PAGE} component={HomeMain} />
          <Route exact path={ROUTERS.PARTNER} component={Partner} />
          <Route exact path={ROUTERS.CUSTOMER} component={Customer} />
          <Route
            exact
            path={ROUTERS.CUSTOMER_INFORMATION}
            component={CustomerInfo}
          />
          <Route exact path={ROUTERS.POST} component={Post} />
          <Route exact path={ROUTERS.POST_REGISTER} component={RegisterPost} />
          <Route exact path={ROUTERS.DETAIL_POST} component={DetailPost} />
          <Route
            exact
            path={ROUTERS.REGISTER_CATEGORY_POST}
            component={RegisterCategoryPost}
          />
          <Route
            exact
            path={ROUTERS.UPDATE_CATEGORY_POST}
            component={UpdateCategoryPost}
          />
          <Route exact path={ROUTERS.ACCOUNTS} component={accountComponents} />
          <Route
            exact
            path={ROUTERS.PARTNER_MANAGEMENT}
            component={partnerManagement}
          />
          <Route
            exact
            path={ROUTERS.INFORMATION_NEEDS}
            component={informationNeeds}
          />
          <Route
            exact
            path={ROUTERS.INFORMATION_PROJECT_REGISTER}
            component={informationProjectRegister}
          />
          <Route
            exact
            path={ROUTERS.PROGRESS_PROJECT}
            component={progressProject}
          />
          <Route exact path={ROUTERS.DISPLAY} component={displayContainer} />
          <Route
            exact
            path={ROUTERS.DISPLAY_IDENTIFIED}
            component={displayIdentifiedContainer}
          />
          <Route
            exact
            path={ROUTERS.DISPLAY_MAIN}
            component={displayMainContainer}
          />
          <Route
            exact
            path={ROUTERS.DISPLAY_SALE}
            component={displaySaleContainer}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
