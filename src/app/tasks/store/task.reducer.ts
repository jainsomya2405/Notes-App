import { Task } from '../task.model';
import * as TasksActions from './task.action';

export interface State {
  tasks: Task[];
}

const initialState: State = {
  tasks: [],
};

export function taskReducer(
  state = initialState,
  action: TasksActions.TasksAction
) {
  switch (action.type) {
    case TasksActions.UPDATE_TASK:
      const tasks = this.getLocalStorageTasks();
      tasks.forEach((data: Task) => {
        if (data.id == action.payload.id) {
          data.name = action.payload.name;
          data.description = action.payload.description;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return { ...state, tasks: tasks };
    default:
      return state;
  }
}
