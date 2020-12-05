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
const Post = lazy(() => import('modules/post/components'));

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
          <Route exact path={ROUTERS.POST} component={Post} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
