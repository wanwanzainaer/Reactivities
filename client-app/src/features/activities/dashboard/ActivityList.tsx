import { observer } from 'mobx-react-lite';
import React, { FC, Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

const ActivityList: FC = () => {
  const {
    activityStore: { groupedActivities },
  } = useStore();

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
