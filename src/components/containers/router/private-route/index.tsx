import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader, NotLoggedContainer } from 'components';
import { authorizeClient } from 'services/apollo';

interface IPrivateRouteProps {
  element: JSX.Element;
}

function PrivateRoute({ element }: IPrivateRouteProps): JSX.Element {
  const { isAuthenticated, loginWithRedirect, isLoading, getIdTokenClaims } = useAuth0();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }

    if (isAuthenticated) {
      getIdTokenClaims().then(({ __raw: token }) => {
        authorizeClient(token);
        setIsReady(true);
      });
    }
  }, [isLoading, isAuthenticated, getIdTokenClaims, loginWithRedirect]);

  return !isReady ? <Loader state={true} /> : isAuthenticated ? element : <NotLoggedContainer />;
}

export default PrivateRoute;
