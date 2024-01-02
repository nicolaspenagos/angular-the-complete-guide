import { Pipe, PipeTransform } from '@angular/core';
import { Server } from '../types/server';

@Pipe({
  name: 'sortByDate',
  pure: false,
})
export class SortByDatePipe implements PipeTransform {
  transform(value: Server[]): Server[] {
    return value.sort((a, b) => a.started.getTime() - b.started.getTime());
  }
}
