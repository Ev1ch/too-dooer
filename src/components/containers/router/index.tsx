import React from 'react';
import { Routes } from 'common';
import { MainContainer, OfflineContainer } from 'components';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

function RouterContainer(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.MAIN} element={<MainContainer />}></Route>
        <Route path={Routes.OFFLINE} element={<OfflineContainer />}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default RouterContainer;
