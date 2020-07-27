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
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

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
  filterText: any;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // console.log(this.store.select('task'));
    // this.store
    //   .select('task')
    //   .pipe(
    //     map((recipeState) => {
    //       return recipeState.tasks;
    //     })
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    if (this.tasksService.isTaskUpdate) {
      this.taskSubs = this.tasksService.taskChanged.subscribe(
        (task: Task[]) => {
          if (task) {
            this.tasks = this.sortDate(task);
            this.selectedTask = JSON.parse(
              localStorage.getItem('selectedTask')
            );
          }
        }
      );
    } else {
      this.tasks = this.sortDate(this.tasksService.getTasks());
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.selectedTask = this.tasks[0];
      localStorage.setItem('selectedTask', JSON.stringify(this.selectedTask));
    }
    this.tasksService.searchChanged.subscribe((data: any) => {
      this.filterText = data;
    });
  }

  ngDoCheck() {
    if (this.tasksService.isTaskUpdate) {
      this.taskSubs = this.tasksService.taskChanged.subscribe(
        (task: Task[]) => {
          if (task) {
            this.tasks = this.sortDate(task);
          }
          this.tasksService.isUpdatedTask();
        }
      );
      this.selectedTask = JSON.parse(localStorage.getItem('selectedTask'));
      this.taskData.emit(this.selectedTask);
    }
    this.tasksService.searchChanged.subscribe((data: any) => {
      this.filterText = data;
    });
  }

  selectTask(data: Task) {
    this.selectedTask = data;
    localStorage.setItem('selectedTask', JSON.stringify(this.selectedTask));
    this.taskData.emit(data);
  }

  sortDate(tasks: Task[]) {
    return tasks.sort((first: any, second: any): number => {
      return first.createdDate < second.createdDate ? 1 : -1;
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('tasks');
    this.taskSubs.unsubscribe();
  }
}
