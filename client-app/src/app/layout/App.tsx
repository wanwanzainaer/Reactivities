import React from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/activities" component={ActivityDashboard} />
          <Route path="/activities/:id" component={ActivityDetails} />
          <Route path="/createActivity" component={ActivityForm} />
        </Switch>
        {/* <ActivityDashboard /> */}
      </Container>
    </>
  );
};

export default observer(App);
