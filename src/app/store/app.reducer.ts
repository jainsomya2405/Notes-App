import { ActionReducerMap } from '@ngrx/store';
import * as fromTask from '../tasks/store/task.reducer';

export interface AppState {
  task: fromTask.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  task: fromTask.taskReducer,
};
