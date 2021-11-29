import React from 'react';
import { ErrorPage } from 'components';

function OfflineContainer(): JSX.Element {
  return <ErrorPage error="You are currently offline. Check connection." />;
}

export default OfflineContainer;
