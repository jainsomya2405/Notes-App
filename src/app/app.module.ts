import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { ListComponent } from './tasks/list/list.component';
import { AppRoutingModule } from './app.routing.module';
import { SearchFilterPipe } from './pipe/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    ListComponent,
    SearchFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  exports: [SearchFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
