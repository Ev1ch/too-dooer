import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const getAuthorizedLink = (token: string, id: string): ApolloLink =>
  setContext((request, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
        ['X-Hasura-User-Id']: id,
      },
    };
  });

export default getAuthorizedLink;
