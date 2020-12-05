// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: any,
  isAuthenticated: boolean,
  path: string,
};

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  path,
  ...rest
}: Props) => {
  const loginPath = '/login';

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || (!isAuthenticated && loginPath === path) ? (
          <Component path={path} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: loginPath,
            }}
          />
        )
      }
    />
  );
};

export default React.memo<Props>(PrivateRoute);
