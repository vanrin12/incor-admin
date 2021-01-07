// @flow

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { createBrowserHistory } from 'history';

import ROUTERS from 'constants/router';

// import { API } from '../apis';
// import PrivateRoute from './PrivateRoute';

const HomeMain = lazy(() => import('modules/home/components'));
const Partner = lazy(() => import('modules/partner/components'));
const Customer = lazy(() => import('modules/customer/components'));
const CustomerInfo = lazy(() =>
  import('modules/customer/components/informationNeedsProject')
);
const Post = lazy(() => import('modules/post/components'));
const RegisterPost = lazy(() => import('modules/post/components/registerPost'));
const RegisterCategoryPost = lazy(() =>
  import('modules/post/components/registerCategory')
);
const UpdateCategoryPost = lazy(() =>
  import('modules/post/components/editCategory')
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

  // if (token) {
  //   API.setHeader('Authorization', `Bearer ${token}`);
  // }

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
