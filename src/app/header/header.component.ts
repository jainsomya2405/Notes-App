import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  filterText: any;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  createTask() {
    this.tasksService.addTask();
    // this.router.navigate(['tasks/list']);
  }

  deleteTask() {
    this.tasksService.deleteTask();
    this.router.navigate(['tasks']);
  }

  search(event: any) {
    this.tasksService.searchChanged.next(event);
  }
}
