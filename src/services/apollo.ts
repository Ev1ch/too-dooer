import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache, HttpLink, split, ApolloLink } from '@apollo/client';
import { Api } from 'common';

export const getHttpLink = (token: string, id: string): ApolloLink =>
  new HttpLink({
    uri: Api.ROOT,
    headers: {
      'X-Hasura-User-Id': id,
      Authorization: `Bearer ${token}`,
    },
  });

export const getWsLink = (token: string, id: string): ApolloLink =>
  new WebSocketLink({
    uri: Api.WEBSOCKETS,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'X-Hasura-User-Id': id,
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

export const authorizeClient = (token: string, id: string): void => {
  const httpLink = getHttpLink(token, id);
  const wsLink = getWsLink(token, id);
  const splitLink = getSplitLink(httpLink, wsLink);

  client.setLink(splitLink);
};
