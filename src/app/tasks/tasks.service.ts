import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { LowerCasePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [
    new Task(1, 'New Task 1', new Date()),
    new Task(2, 'New Task 2', new Date()),
    new Task(3, 'New Task 3', new Date()),
    new Task(4, 'New Task 4', new Date()),
    new Task(5, 'New Task 5', new Date()),
    new Task(6, 'New Task 5', new Date()),
    new Task(7, 'New Task 5', new Date()),
    new Task(8, 'New Task 5', new Date()),
    new Task(9, 'New Task 5', new Date()),
    new Task(10, 'New Task 5', new Date()),
    new Task(11, 'New Task 5', new Date()),
    new Task(12, 'New Task 5', new Date()),
    new Task(13, 'New Task 5', new Date()),
    new Task(14, 'New Task 5', new Date()),
    new Task(15, 'New Task 5', new Date()),
  ];

  constructor() {}

  getTasks() {
    return this.tasks.slice();
  }

  getLocalStorageTasks() {
    return JSON.parse(localStorage.getItem('tasks'));
  }

  addTask() {
    const tasks = this.getLocalStorageTasks();
    tasks.push(new Task(tasks.length + 1, 'New Task', new Date()));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return null;
  }

  savedData(task: Task) {
    const tasks = this.getLocalStorageTasks();
    tasks.forEach((data: Task) => {
      if (data.id == task.id) data.name = task.name;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask() {
    const selectedTask = JSON.parse(localStorage.getItem('selectedTask'));
    const tasks = this.getLocalStorageTasks();
    tasks.splice(selectedTask.id, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
