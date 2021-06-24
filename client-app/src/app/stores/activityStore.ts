import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // makeObservable(this, {
    //   title: observable,
    //   setTitle: action,
    // });
    makeAutoObservable(this);
  }
  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      this.activities = activities.map((activity) => {
        activity.date = activity.date.split('T')[0];
        return activity;
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };
  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id) ?? null;
  };
  cancelSelectActivity = () => {
    this.selectedActivity = null;
  };

  setLoadingInitial = (state: boolean) => (this.loadingInitial = state);
}
