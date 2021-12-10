import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader, NotLoggedContainer } from 'components';
import { client, splitLink } from 'index';
import { setContext } from '@apollo/client/link/context';

interface IPrivateRouteProps {
  element: JSX.Element;
}

function PrivateRoute({ element }: IPrivateRouteProps): JSX.Element {
  const { isAuthenticated, loginWithRedirect, isLoading, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }

    if (isAuthenticated) {
      console.log(user);
      getAccessTokenSilently().then(() => {
        const authLink = setContext((_, { headers }) => {
          const token = localStorage.getItem('token');

          return {
            headers: {
              ...headers,
              Authorization: token ? `Bearer ${token}` : '',
            },
          };
        });

        client.setLink(authLink.concat(splitLink));
      });
    }
  }, [isLoading, isAuthenticated]);

  return isLoading ? <Loader state={true} /> : isAuthenticated ? element : <NotLoggedContainer />;
}

export default PrivateRoute;
