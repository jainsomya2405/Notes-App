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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, DoCheck, OnDestroy {
  selectedTask: Task;
  @Output() taskData = new EventEmitter<Task>();
  tasks: Task[];

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.route);
    const data = localStorage.getItem('tasks');
    if (JSON.parse(data)) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
      this.tasks = this.tasksService.getTasks();
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    // this.tasks = this.tasksService.getTasks();
    // localStorage.setItem('tasks', JSON.stringify(this.tasks));
    if (!this.selectedTask) {
      this.selectedTask = this.tasks[0];
      localStorage.setItem('selectedTask', JSON.stringify(this.selectedTask));
    }
  }

  ngDoCheck() {
    // console.log('do cjheck', this.selectedTask);
  }

  selectTask(data: Task) {
    this.selectedTask = data;
    localStorage.setItem('selectedTask', JSON.stringify(this.selectedTask));
    this.taskData.emit(data);
  }

  ngOnDestroy() {
    localStorage.removeItem('tasks');
  }
}
