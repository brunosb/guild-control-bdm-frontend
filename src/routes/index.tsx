import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/Signin';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
  </Switch>
);

export default Routes;
