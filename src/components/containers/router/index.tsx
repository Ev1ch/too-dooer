import React from 'react';
import { Routes } from 'common';
import { MainContainer, OfflineContainer } from 'components';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';

function RouterContainer(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.MAIN} element={<PrivateRoute element={<MainContainer />} />} />
        <Route path={Routes.OFFLINE} element={<PublicRoute element={<OfflineContainer />} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default RouterContainer;
