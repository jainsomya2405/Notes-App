import { Injectable } from '@angular/core';
import { Task } from './task.model';
import {  BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [
    new Task(1, 'New Task 1', new Date()),
    new Task(2, 'New Task 2', new Date()),
    new Task(3, 'New Task 3', new Date()),
    new Task(4, 'New Task 4', new Date()),
    new Task(5, 'New Task 5', new Date()),
  ];
  taskChanged = new BehaviorSubject<Task[]>(this.tasks);
  isTaskUpdate = false;

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
    tasks.push(new Task(tasks.length + 1, 'New Task', new Date()));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.taskChanged.next(tasks);
  }

  savedData(task: Task) {
    this.isTaskUpdate = true;
    const tasks = this.getLocalStorageTasks();
    tasks.forEach((data: Task) => {
      if (data.id == task.id) data.name = task.name;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.taskChanged.next(tasks);
  }

  deleteTask() {
    debugger;
    this.isTaskUpdate = true;
    const selectedTask = JSON.parse(localStorage.getItem('selectedTask'));
    const tasks = this.getLocalStorageTasks();
    tasks.splice(selectedTask.id - 1, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.taskChanged.next(tasks);
  }

  isUpdatedTask() {
    this.isTaskUpdate = false;
  }
}
