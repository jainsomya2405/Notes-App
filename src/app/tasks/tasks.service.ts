import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [
    new Task(
      1,
      'New Task 1',
      new Date(2018, 11, 24, 10, 33, 30, 0),
      'Harshita'
    ),
    new Task(
      2,
      'New Task 2',
      new Date(2020, 6, 20, 23, 30, 30, 0),
      'somya'
    ),
    new Task(
      3,
      'New Task 3',
      new Date(2020, 5, 24, 9, 12, 30, 0),
      'This is our newly task 3'
    ),
    new Task(
      4,
      'New Task 4',
      new Date(2020, 6, 21, 16, 25, 30, 0),
      'jain'
    ),
    new Task(
      5,
      'New Task 5',
      new Date(2020, 6, 22, 13, 0, 0, 0),
      'jain'
    ),
  ];
  taskChanged = new BehaviorSubject<Task[]>(this.tasks);
  isTaskUpdate = false;
  searchChanged= new Subject<any>();

  constructor() {}

  getTasks() {
    return this.tasks.slice();
  }

  getLocalStorageTasks() {
    return JSON.parse(localStorage.getItem('tasks'));
  }

  addTask() {
    this.isTaskUpdate = true;
    const tasks = this.getLocalStorageTasks();
    const task = new Task(tasks.length + 1, 'New Task', new Date(), '');
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('selectedTask', JSON.stringify(task));
    this.taskChanged.next(tasks);
  }

  savedData(task: Task) {
    this.isTaskUpdate = true;
    const tasks = this.getLocalStorageTasks();
    tasks.forEach((data: Task) => {
      if (data.id == task.id) {
        data.name = task.name;
        data.description = task.description;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.taskChanged.next(tasks);
  }

  deleteTask() {
    this.isTaskUpdate = true;
    const selectedTask = JSON.parse(localStorage.getItem('selectedTask'));
    const tasks = this.getLocalStorageTasks();
    // let indexCount: number;
    tasks.forEach((taskData: Task, index: number) => {
      if (taskData.id == selectedTask.id) {
        tasks.splice(index, 1);
        // indexCount = index + 1;
      }
      // if (indexCount == index) {
      //   localStorage.setItem('selectedTask', JSON.stringify(taskData));
      // }
    });
    localStorage.setItem('selectedTask', JSON.stringify(tasks[0]));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.taskChanged.next(tasks);
  }

  isUpdatedTask() {
    this.isTaskUpdate = false;
  }
}
