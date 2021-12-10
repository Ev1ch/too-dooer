import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader, NotLoggedContainer } from 'components';
import { client, splitLink } from 'index';
import { getAuthorizedLink } from 'helpers';

interface IPrivateRouteProps {
  element: JSX.Element;
}

function PrivateRoute({ element }: IPrivateRouteProps): JSX.Element {
  const { isAuthenticated, loginWithRedirect, isLoading, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }

    if (isAuthenticated) {
      getIdTokenClaims().then(({ __raw: token, sub: id }) => {
        const authLink = getAuthorizedLink(token, id);
        client.setLink(authLink.concat(splitLink));
      });
    }
  }, [isLoading, isAuthenticated]);

  return isLoading ? <Loader state={true} /> : isAuthenticated ? element : <NotLoggedContainer />;
}

export default PrivateRoute;
