import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache, HttpLink, split, ApolloLink } from '@apollo/client';
import { Api } from 'common';

export const getHttpLink = (token: string): ApolloLink =>
  new HttpLink({
    uri: Api.ROOT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getWsLink = (token: string): ApolloLink =>
  new WebSocketLink({
    uri: Api.WEBSOCKETS,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  });

export const getSplitLink = (wsLink: ApolloLink, httpLink: ApolloLink): ApolloLink =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

export const client = new ApolloClient({
  cache: new InMemoryCache(),
});

export const authorizeClient = (token: string): void => {
  const httpLink = getHttpLink(token);
  const wsLink = getWsLink(token);
  const splitLink = getSplitLink(wsLink, httpLink);

  client.setLink(splitLink);
  client.resetStore();
};
