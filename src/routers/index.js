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
  import('modules/customer/containers/infomationNeedsProjectContainer')
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
  import('modules/customer/containers/customerDetailContainer')
);
const informationProjectRegister = lazy(() =>
  import('modules/customer/containers/registerProjectContainer')
);
const progressProject = lazy(() =>
  import('modules/customer/containers/progressProjectContainer')
);
const displayContainer = lazy(() => import('modules/display/components'));
const displayIdentifiedContainer = lazy(() =>
  import('modules/display/containers/identifiedContainer')
);
const displayMainContainer = lazy(() =>
  import('modules/display/containers/mainContainer')
);
const displaySaleContainer = lazy(() =>
  import('modules/display/containers/sale')
);
const AboutUsContainer = lazy(() => import('modules/display/containers'));

const displayMediaContainer = lazy(() =>
  import('modules/media/containers/index')
);
const CustomerContainer = lazy(() =>
  import('modules/display/containers/customer')
);

const displayHeaderContainer = lazy(() =>
  import('modules/display/containers/displayHeaderContainer')
);

const displayHeaderIntroduceContainer = lazy(() =>
  import('modules/display/containers/displayHeaderIntroduceContainer')
);

const displayFooterContainer = lazy(() =>
  import('modules/display/containers/displayFooterContainer')
);

const displayDataContainer = lazy(() =>
  import('modules/data/containers/dataContainer')
);

type Props = {
  token: string,
  roleUser: Object,
};

const Router = ({ token, roleUser }: Props) => {
  const isAuthenticated = token !== '';

  if (token) {
    API.setHeader('Authorization', `Bearer ${token}`);
  }
  return (
    <BrowserRouter>
      <Suspense>
        <Switch>
          {(roleUser?.name === 'content' ||
            roleUser?.name === 'administrator') && (
            <Route
              exact
              path={ROUTERS.MAIN_MEDIA}
              component={displayMediaContainer}
            />
          )}
          <Route exact path={ROUTERS.LOGIN} component={loginContainer} />
          {(roleUser?.name === 'administrator' ||
            roleUser?.name === undefined) && (
            <PrivateRoute
              exact
              path={ROUTERS.MAIN_PAGE}
              component={HomeMain}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.PARTNER}
              component={Partner}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'customer' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.CUSTOMER}
              component={Customer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'customer' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.CUSTOMER_INFORMATION}
              component={CustomerInfo}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'customer' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.INFORMATION_NEEDS}
              component={informationNeeds}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'customer' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.INFORMATION_PROJECT_REGISTER}
              component={informationProjectRegister}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'customer' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.PROGRESS_PROJECT_DETAIL}
              component={progressProject}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'content' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.POST}
              component={Post}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'content' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.POST_REGISTER}
              component={RegisterPost}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'content' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.DETAIL_POST}
              component={DetailPost}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'content' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.REGISTER_CATEGORY_POST}
              component={RegisterCategoryPost}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'content' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.UPDATE_CATEGORY_POST}
              component={UpdateCategoryPost}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.ACCOUNTS}
              component={accountComponents}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'partner' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.PARTNER_MANAGEMENT}
              component={partnerManagement}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY}
              component={displayContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY_HEADER_INTRODUCE}
              component={displayHeaderIntroduceContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY_HEADER}
              component={displayHeaderContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY_FOOTER}
              component={displayFooterContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY_IDENTIFIED}
              component={displayIdentifiedContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY_MAIN}
              component={displayMainContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.ABOUT_US}
              component={AboutUsContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {(roleUser?.name === 'customer' ||
            roleUser?.name === 'administrator') && (
            <PrivateRoute
              exact
              path={ROUTERS.CUSTOMER_EXP}
              component={CustomerContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY_SALE}
              component={displaySaleContainer}
              isAuthenticated={isAuthenticated}
            />
          )}

          {roleUser?.name === 'administrator' && (
            <PrivateRoute
              exact
              path={ROUTERS.DISPLAY_DATA}
              component={displayDataContainer}
              isAuthenticated={isAuthenticated}
            />
          )}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    roleUser: state.authReducer.roleUser,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(memo<Props>(Router));
