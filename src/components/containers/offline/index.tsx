import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ErrorPage } from 'components';
import { Routes } from 'common';

function OfflineContainer(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.fromRouter) {
      navigate(Routes.MAIN);
    }
  }, []);

  return <ErrorPage error="You are currently offline. Check connection." />;
}

export default OfflineContainer;
