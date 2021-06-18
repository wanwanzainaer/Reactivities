import React, { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import ActivityList from '../activities/ActivityList';
interface ActivityDashboardProp {
  activities: Activity[];
}
const ActivityDashboard: FC<ActivityDashboardProp> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
