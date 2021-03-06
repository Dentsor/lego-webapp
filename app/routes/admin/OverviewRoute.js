// @flow

import { LoginPage } from 'app/components/LoginForm';
import replaceUnlessLoggedIn from 'app/utils/replaceUnlessLoggedIn';
import RouteWrapper from 'app/components/RouteWrapper';
import { Switch } from 'react-router-dom';
import groups from './groups';
import email from './email';
import type { User } from 'app/models';

const OverviewRoute = ({
  children,
  currentUser,
  loggedIn,
  match,
}: {
  children: any,
  currentUser: User,
  loggedIn: boolean,
  match: { path: string },
}) => {
  return (
    <Switch>
      <RouteWrapper
        path={`${match.path}/groups`}
        passedProps={{ currentUser, loggedIn }}
        Component={groups}
      />
      <RouteWrapper
        path={`${match.path}/email`}
        passedProps={{ currentUser, loggedIn }}
        Component={email}
      />
    </Switch>
  );
};

export default replaceUnlessLoggedIn(LoginPage)(OverviewRoute);
