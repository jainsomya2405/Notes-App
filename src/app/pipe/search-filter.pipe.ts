import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../tasks/task.model';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: Task[], filterText?: any): Task[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;
    // Only filter by key
    // return filterText ? value.filter((x: Task) => x.name.toLocaleLowerCase().indexOf(filterText) >= 0) : value;

    // filter all the data but complex
    // return filterText ? value.filter((o) =>
    //       Object.keys(o).some((k) =>
    //         o[k].toString().toLocaleLowerCase().includes(filterText)
    //       )
    //     )
    //   : value;

    // filter in easy way
    return filterText
      ? value.filter(
          (data) =>
            JSON.stringify(data).toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
