import { Action } from '@ngrx/store';
import { Task } from '../task.model';

export const UPDATE_TASK = '[Task] Update Task';

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;

  constructor(public payload: Task){};
}

export type TasksAction = UpdateTask;
