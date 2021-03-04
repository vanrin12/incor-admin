// @flow

import React, { lazy, Suspense, memo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';

// import { createBrowserHistory } from 'history';

import ROUTERS from 'constants/router';

import { API } from '../utils/Apis';
import PrivateRoute from './PrivateRoute';

const loginContainer = lazy(() =>
  import('modules/authen/containers/loginContainer')
);

const HomeMain = lazy(() => import('modules/home/components'));

const Partner = lazy(() =>
  import('modules/partner/containers/partnerContainer')
);
const Customer = lazy(() =>
  import('modules/customer/containers/customerContainer')
);
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
  import('modules/partner/containers/partnerManagementContainer')
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

const displayMediaContainer = lazy(() =>
  import('modules/media/containers/index')
);

type Props = {
  token: string,
};

const Router = ({ token }: Props) => {
  const isAuthenticated = token !== '';

  if (token) {
    API.setHeader('Authorization', `Bearer ${token}`);
  }

  return (
    <BrowserRouter>
      <Suspense>
        <Switch>
          <Route
            exact
            path={ROUTERS.MAIN_MEDIA}
            component={displayMediaContainer}
          />
          <Route exact path={ROUTERS.LOGIN} component={loginContainer} />
          <PrivateRoute
            exact
            path={ROUTERS.MAIN_PAGE}
            component={HomeMain}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PARTNER}
            component={Partner}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.CUSTOMER}
            component={Customer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.CUSTOMER_INFORMATION}
            component={CustomerInfo}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.POST}
            component={Post}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.POST_REGISTER}
            component={RegisterPost}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DETAIL_POST}
            component={DetailPost}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.REGISTER_CATEGORY_POST}
            component={RegisterCategoryPost}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.UPDATE_CATEGORY_POST}
            component={UpdateCategoryPost}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.ACCOUNTS}
            component={accountComponents}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PARTNER_MANAGEMENT}
            component={partnerManagement}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.INFORMATION_NEEDS}
            component={informationNeeds}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.INFORMATION_PROJECT_REGISTER}
            component={informationProjectRegister}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.PROGRESS_PROJECT}
            component={progressProject}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DISPLAY}
            component={displayContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DISPLAY_IDENTIFIED}
            component={displayIdentifiedContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DISPLAY_MAIN}
            component={displayMainContainer}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path={ROUTERS.DISPLAY_SALE}
            component={displaySaleContainer}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(memo<Props>(Router));
