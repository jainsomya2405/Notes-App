import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  name: string;
  @ViewChild(ListComponent) taskViewChild: ListComponent;
  outputTask: Task;

  constructor(
    private tasksService: TasksService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.taskViewChild && this.taskViewChild.selectedTask && !this.name) {
      this.name = this.taskViewChild.selectedTask.name;
      this.cd.detectChanges();
    }
  }

  dataChanged(event: string) {
    this.taskViewChild.selectedTask.name = event;
    this.cd.detectChanges();
    this.tasksService.savedData(this.taskViewChild.selectedTask);
  }

  noteData(event: Task) {
    this.outputTask = event;
    this.name = event.name;
  }

  ngOnDestroy() {
    localStorage.removeItem('tasks');
  }
}
