import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { client } from 'services/apollo';

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const location = window.location.origin;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={location} useRefreshTokens={true}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
