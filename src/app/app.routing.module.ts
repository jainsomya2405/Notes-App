import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ListComponent } from './tasks/list/list.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    children: [{ path: 'list', component: ListComponent }],
  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
