import React from 'react';
import { ErrorPage } from 'components';

function NotLoggedContainer(): JSX.Element {
  return <ErrorPage error="Not logged." />;
}

export default NotLoggedContainer;
