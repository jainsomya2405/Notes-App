import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
  OnDestroy,
} from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, DoCheck, OnDestroy {
  selectedTask: Task;
  @Output() taskData = new EventEmitter<Task>();
  tasks: Task[];
  taskSubs: Subscription;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.tasksService.isTaskUpdate) {
      this.taskSubs = this.tasksService.taskChanged.subscribe(
        (task: Task[]) => {
          if (task) {
            this.tasks = task;
          }
        }
      );
    } else {
      this.tasks = this.tasksService.getTasks();
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    if (!this.selectedTask) {
      this.selectedTask = this.tasks[0];
      localStorage.setItem('selectedTask', JSON.stringify(this.selectedTask));
    }
  }

  ngDoCheck() {
    if (this.tasksService.isTaskUpdate) {
      this.taskSubs = this.tasksService.taskChanged.subscribe(
        (task: Task[]) => {
          if (task) {
            this.tasks = task;
          }
          this.tasksService.isUpdatedTask();
        }
      );
    }
  }

  selectTask(data: Task) {
    this.selectedTask = data;
    localStorage.setItem('selectedTask', JSON.stringify(this.selectedTask));
    this.taskData.emit(data);
  }

  ngOnDestroy() {
    localStorage.removeItem('tasks');
    this.taskSubs.unsubscribe();
  }
}
