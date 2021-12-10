import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Api } from 'common';

const httpLink = new HttpLink({
  uri: Api.ROOT,
});

const wsLink = new WebSocketLink({
  uri: Api.WEBSOCKETS,
  options: {
    reconnect: true,
  },
});

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const location = window.location.origin;

console.log(clientId, domain, location);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={location}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
