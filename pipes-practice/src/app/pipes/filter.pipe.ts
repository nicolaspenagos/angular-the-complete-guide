import { Pipe, PipeTransform } from '@angular/core';
import { Server, ServerProp } from '../types/server';
@Pipe({
  name: 'filter',
  // NOT RECOMMENDED
  pure: false, // !!! Be aware of performance issues, the is gonna be recalculated whenever the data changes
})
export class FilterPipe implements PipeTransform {
  transform(
    value: Server[],
    filterString: string,
    propName: ServerProp
  ): Server[] {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray: Server[] = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
